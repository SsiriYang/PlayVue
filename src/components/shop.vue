<template>
  <div>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <div class="main-grids">
        <div class="recommended">
          <div class="recommended-grids">
            <div id="top" class="callbacks_container" v-for="type in typeList ">
              <div class="recommended-info" style="margin-top: 2em;">
                <h3>{{type.typeName}}</h3>
              </div>

              <ul class="rslides callbacks callbacks1" id="slider3" v-for="(goodlist,index) in goodsList">
                <li id="callbacks1_s0" style="display: block; float: left; position: relative; opacity: 1; z-index: 2; transition: opacity 500ms ease-in-out 0s;"
                  class="callbacks1_on">
                  <div class="animated-grids" v-for="(item,index) in goodlist.list" v-if="item.typeId == type.id">
                    <div class="col-md-3 resent-grid recommended-grid slider-first">
                      <div class="resent-grid-img recommended-grid-img">
                        <a @click="goumai(item.id)"><img :src="item.picture" alt=""></a>
                      </div>
                      <div class="resent-grid-info recommended-grid-info" style="padding: 1em 3em 3em 1em">
                        <div style="float: left;">
                          <a style="float: left;font-size: large; width: 150px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                            {{item.name}}
                          </a><br />

                          <a style="font-weight: normal; float: left;">￥{{item.price}}</a>
                        </div>


                        <!--<a class="btn btn-primary" :href="'/goodsInfo/:'+item.id">购买</a>-->
                        <div style="float: right;"> <button class="btn btn-primary" @click="goumai(item.id)">购买</button>
                        </div>

                      </div>
                    </div>


                  </div>


                </li>


              </ul>
              <template v-for="(goodlist,index) in goodsList" v-if="goodlist.list[0].typeId==type.id">
                <ul class="pagination">
                  <li><a class="btn" v-bind:class="{disabled:goodlist.pageNum==1}" @click="prePage(goodlist.pageNum,type.id)"
                      href="javascript:void(0)">上一页</a></li>
                  <template v-for="num in goodlist.navigatepageNums">
                    <li v-bind:class="{active:goodlist.pageNum==num}"><a @click="goPage(num,type.id)" href="javascript:void(0)">{{num}}</a></li>
                  </template>
                  <li><a class="btn" v-bind:class="{disabled:goodlist.pageNum==goodlist.pages}" @click="nextPage(goodlist.pageNum,type.id)"
                      href="javascript:void(0)">下一页</a></li>
                </ul>
              </template>

            </div>
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'shop',
    data() {
      return {
        typeList: [],
        goodsList: [],
        pageinfo: {
          pageNum: '1',

        }

      }
    },
    created: function() {
      this.shoplist();
    },
    methods: {

      shoplist: function() {
        this.$http.get("http://localhost:80/goodsType/selectType").then(
          function(result) {
            console.log(result);
            this.typeList = result.body;
            //alert(typeof this.typeList)
            //-----------------
            for (var i = 0; i < this.typeList.length; i++) {
              //alert(i);
              var id = this.typeList[i].id;

              this.$http.get("http://localhost:80/goods/select", {
                params: {
                  pageNum: this.pageinfo.pageNum,
                  typeId: id
                }
              }).then(
                function(result) {
                  console.log(result.body);
                  this.goodsList.push(result.body);
                },
                function(error) {
                  alert("加载失败")
                })
            }
          },
          function(error) {
            alert("error")
          }
        )

      },
      goumai: function(id) {
        console.log("传之前：" + id);
        this.$router.push({
          path: '/goodsInfo',
          query: {
            id: id
          }
        })
      },
      goPage: function(num, typeId) {
        this.$http.get("http://localhost:80/goods/select", {
          params: {
            pageNum: num,
            typeId: typeId
          }
        }).then(function(result) {
          console.log("成功：");
          console.log(result.body)
          for (var i = 0; i < this.goodsList.length; i++) {
            if (this.goodsList[i].list[0].typeId == result.body.list[0].typeId) {
              this.goodsList.splice(i, 1);
            }
          }
          this.goodsList.push(result.body);
        }, function(error) {
          alert("error")
        })
      },
      prePage: function(pageNum, typeId) {
        this.$http.get("http://localhost:80/goods/select", {
          params: {
            pageNum: pageNum - 1,
            typeId: typeId
          }
        }).then(function(result) {
          console.log("成功：");
          console.log(result.body)
          for (var i = 0; i < this.goodsList.length; i++) {
            if (this.goodsList[i].list[0].typeId == result.body.list[0].typeId) {
              this.goodsList.splice(i, 1);
            }
          }
          this.goodsList.push(result.body);
        }, function(error) {
          alert("error")
        })
      },
      nextPage: function(pageNum, typeId) {
        this.$http.get("http://localhost:80/goods/select", {
          params: {
            pageNum: pageNum + 1,
            typeId: typeId
          }
        }).then(function(result) {
          console.log("成功：");
          console.log(result.body)
          for (var i = 0; i < this.goodsList.length; i++) {
            if (this.goodsList[i].list[0].typeId == result.body.list[0].typeId) {
              this.goodsList.splice(i, 1);
            }
          }
          this.goodsList.push(result.body);
        }, function(error) {
          alert("error")
        })
      }

    }
  }
</script>

<style scoped>
  a:hover{
    cursor: pointer;
    text-decoration: none;
  }
  .callbacks1_on {
    margin-top: 2em;
  }

  .resent-grid a img {
    width: 100%;
    height: 210px;
    cursor: pointer;
    transition: all 0.5s;
    /* 所有的属性变化在0.5s的时间段内完成 */
  }

  .resent-grid a img:hover {
    transform: scale(1.1);
    /* 鼠标放到图片上的时候图片按比例放大   */
  }

  .resent-grid {
    margin-top: 2em;
    padding-left: 0.1em;
  }

  .callbacks1_on {
    margin-top: 0em;
  }

  .animated-grids {
    margin-bottom: 0em;
  }

  .slid-bottom-grids {
    margin: 1em 0 0 0;
  }

  .recommended-grids {
    margin: 1em 0;
  }

  .resent-grid-img {
    position: relative;
    box-shadow: 0px 0px 1px #C1C1C1 !important;
  }

  .recommended-info h3 {
    font-size: 20px;
    color: #181818;
    /* margin: 0 0 1em 0; */
    font-weight: 600;
  }
</style>
