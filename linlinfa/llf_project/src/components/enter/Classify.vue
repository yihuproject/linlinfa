<template>
  <div class="classify">
    <Header :title="msg" :history="history"></Header>
    <div class="classify_level">
      <van-row>
        <van-col :span="7">
          <vue-better-scroll ref="scroll1" :startY="parseInt(startY)">
            <ul class="classify_level1_ul">
              <li
                :class="{active_level1:index== current1}"
                v-for="(listArr,index) in list"
                :key="listArr.gc_id"
                @touchstart="clickLevel1(index,listArr)"
              >
                <span>{{listArr.gc_name}}</span>
              </li>
              <li>
                <span></span>
              </li>
            </ul>
          </vue-better-scroll>
        </van-col>
        <van-col :span="8">
          <vue-better-scroll ref="scroll2" :startY="parseInt(startY)" v-if="!!list[current1]">
            <ul class="classify_level2_ul">
              <li
                :class="{active_level2:index2 == current2}"
                v-for="(listArr2,index2) in list[current1].children"
                @touchstart="clickLevel2(index2,listArr2)"
                :key="listArr2.gc_id"
              >{{listArr2.gc_name}}</li>
              <li></li>
            </ul>
          </vue-better-scroll>
        </van-col>
        <van-col :span="9">
          <vue-better-scroll
            ref="scroll3"
            :startY="parseInt(startY)"
            v-if="!!list[current1] && !!list[current1].children[current2]"
          >
            <ul class="classify_level3_ul">
              <li
                :class="{active_level3:index3 == current3}"
                v-for="(listArr3,index3) in list[current1].children[current2].children"
                @touchstart="clickLevel3(index3,listArr3)"
                :key="listArr3.gc_id"
              >{{listArr3.gc_name}}</li>
              <li></li>
            </ul>
          </vue-better-scroll>
        </van-col>
      </van-row>
    </div>
    <van-row class="next_btn" ref="btn">
      <van-col :span="22" :offset="1">
        <van-button type="info" size="large" @touchstart="next">提交</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Header from "../header";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      msg: "3/3 店铺分类",
      listLength: 9,
      clientHeight: 0,
      current1: 0,
      current2: 0,
      current3: 0,
      value1: "",
      value2: "",
      value3: "",
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      history: null,
      list: [
        {
          gc_id: "1065",
          gc_name: "奶茶果汁",
          children: [
            {
              gc_id: "1064",
              gc_name: "甜品",
              children: [
                {
                  gc_id: "1063",
                  gc_name: "餐饮美食"
                }
              ]
            }
          ]
        }
      ],
      member_id: "",
      company_name: "",
      contact_name: "",
      contacts_name: "",
      contacts_phone: "",
      company_address: "",
      company_address_detail: "",
      face_img: "",
      store_img: "",
      logo_img: "",
      business_sphere: "",
      business_licence_number: "",
      ID_card: "",
      business_licence_number_electronic: "",
      store_class_ids: [],
      store_class_names: [],
      sc_id: null
    };
  },
  components: {
    Header
  },
  methods: {
    toast() {
      this.$toast.loading({
        duration: 0,
        mask: true,
        forbidClick: false,
        message: "上传中..."
      });
    },
    clickLevel1(index, el) {
      console.log(this.list[this.current1].children);
      this.current1 = index;
      this.current2 = 0;
      this.current3 = 0;
      this.value1 = el.gc_name;
      this.sc_id = el.gc_id;
    },
    clickLevel2(index, el) {
      this.current2 = index;
      this.current3 = 0;
      this.value2 = el.gc_name;
      this.sc_id = el.gc_id;
    },
    clickLevel3(index, el) {
      this.current3 = index;
      this.value3 = el.gc_name;
      this.sc_id = el.gc_id;
    },
    scrollTo() {
      this.$refs.scroll1.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
      this.$refs.scroll2.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
      this.$refs.scroll3.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
    },
    next() {
      if (this.sc_id) {
        this.toast();
        // first step
        var formData = new FormData();
        formData.append("member_id", this.member_id);
        formData.append("company_name", this.company_name);
        formData.append("contacts_name", this.contacts_name);
        formData.append("contacts_phone", this.contacts_phone);
        formData.append("company_address", this.company_address);
        formData.append("company_address_detail", this.company_address_detail);
        formData.append("face_img", this.face_img);
        formData.append("store_img", this.store_img);
        formData.append("logo_img", this.logo_img);
        formData.append("business_sphere", this.business_sphere);
        // second step
        formData.append("sc_id", this.sc_id);
        formData.append(
          "business_licence_number",
          this.business_licence_number
        );
        formData.append("ID_card", this.ID_card);
        formData.append(
          "business_licence_number_electronic",
          this.business_licence_number_electronic
        );
        formData.append("longitude", localStorage.getItem("longitude"));
        formData.append("dimension", localStorage.getItem("latitude"));

        this.$axios
          .post("/v3/store_joinin_step1", formData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
          .then(data => {
            console.log(data);
            localStorage.clear();
            alert(this.member_id);
            this.$toast(data.data.msg);
            this.history = 0;
            this.$router.push("/checks/" + this.member_id);
            this.$toast().clear();
          })
          .catch(err => {
            this.$toast("信息上传失败，请检查网络是否连接");
            console.log(err);
          });
      } else {
        this.$toast("信息上传失败，请选择分类");
      }
    }
  },
  created() {
    // first step
    this.member_id = this.$route.params.member_id;
    this.company_name = localStorage.getItem("company_name");
    this.contacts_name = localStorage.getItem("contacts_name");
    this.contacts_phone = localStorage.getItem("contacts_phone");
    this.company_address = localStorage.getItem("company_address");
    this.company_address_detail = localStorage.getItem(
      "company_address_detail"
    );
    this.face_img = localStorage.getItem("face_img");
    this.store_img = localStorage.getItem("store_img");
    this.logo_img = localStorage.getItem("logo_img");
    this.business_sphere = localStorage.getItem("business_sphere");
    // second step
    this.business_licence_number = localStorage.getItem(
      "business_licence_number"
    );
    this.ID_card = localStorage.getItem("ID_card");
    this.business_licence_number_electronic = localStorage.getItem(
      "business_licence_number_electronic"
    );
    //post value
    var formData = new FormData();
    formData.append("store_id", 1);
    this.$axios
      .post("/v3/gc_list", formData, {
        headers: { "Content-Type": "application/json" }
      })
      .then(data => {
        // /v3/area_list
        this.list = data.data.data;
        console.log(data);
        console.log(this.list);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="stylus">
div.classify {
  width: totalWid;
  overflow: hidden;
  background: cwhite;
  height: 94vh;

  div.classify_level {
    width: totalWid;
    position: relative;
    height: 100%;

    .van-row {
      height: 100%;

      .van-col {
        height: 100%;
        font-size: 17PX;

        ul.classify_level1_ul {
          width: 200px;
          display: inline-block;
          background: cf5;
          height: 100%;
          min-height: 94vh;

          li {
            width: 200px;
            height: 96px;

            span {
              width: 167px;
              display: inline-block;
              margin: 30px 0;
              padding-left: 30px;
              text-align: left;
            }
          }
        }

        ul.classify_level2_ul {
          width: 229px;
          display: inline-block;
          border-right: 2px solid #e5e5e5;
          height: 100%;
          min-height: 94vh;

          li {
            width: 199px;
            height: 36px;
            display: inline-block;
            padding-left: 30px;
            text-align: left;
            margin: 30px 0;
          }
        }

        ul.classify_level3_ul {
          width: 289px;
          display: inline-block;
          height: 100%;
          min-height: 94vh;

          li {
            width: 259px;
            height: 36px;
            display: inline-block;
            padding-left: 30px;
            text-align: left;
            margin: 30px 0;
          }

          /li.active_level1 {
            background: cwhite;

            span {
              width: 170px;
              display: inline-block;
              margin: 30px 0;
              padding-left: 30px;
              border-left: classifyBorder;
              text-align: left;
              color: cblue;
            }
          }

          /li.active_level2 {
            color: cblue;
          }

          /li.active_level3 {
            color: cblue;
          }
        }
      }
    }
  }

  /div.next_btn {
    position: absolute;
    bottom: 0;
    width: totalWid;
    z-index: 102;
  }
}

[data-dpr='1'] div.classify {
  div.classify_level {
    .van-row {
      .van-col {
        font-size: font16;

        ul.classify_level1_ul {
          li {
            font-size: font16;
          }
        }

        ul.classify_level2_ul {
          li {
            font-size: font16;
          }
        }

        ul.classify_level3_ul {
          li {
            font-size: font16;
          }
        }
      }
    }
  }
}

[data-dpr='2'] div.classify {
  div.classify_level {
    .van-row {
      .van-col {
        font-size: font34;

        ul.classify_level1_ul {
          li {
            font-size: font34;
          }
        }

        ul.classify_level2_ul {
          li {
            font-size: font34;
          }
        }

        ul.classify_level3_ul {
          li {
            font-size: font34;
          }
        }
      }
    }
  }
}

[data-dpr='3'] div.classify, div.classify_level {
  .van-row {
    .van-col {
      font-size: font50;

      ul.classify_level1_ul {
        li {
          font-size: font50;
        }
      }

      ul.classify_level2_ul {
        li {
          font-size: font50;
        }
      }

      ul.classify_level3_ul {
        li {
          font-size: font50;
        }
      }
    }
  }
}
</style>