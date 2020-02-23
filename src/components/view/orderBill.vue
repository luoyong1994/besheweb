<!-- 完成订单结账功能，将分配完成的订单进行显示，并完成结账 -->
<template>
  <div>
    <el-table :data="tableData" :stripe="status" style="width: 100%;padding-left:10px;">
      <el-table-column prop="shop" label="店铺" width="150"></el-table-column>
      <el-table-column prop="wantName" label="旺旺名"></el-table-column>
      <el-table-column prop="orderDate" label="接单时间" width="150"></el-table-column>
      <el-table-column prop="projectName" label="项目名" width="150"></el-table-column>
      <el-table-column prop="technology" label="使用技术" width="150"></el-table-column>
      <el-table-column prop="programName" label="程序技术分配" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
              :type="scope.row.programName ==null ? 'warning' : 'success'"
            >{{scope.row.programName==null? "未分配":"已分配"}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="paperName" label="论文技术分配" width="120">
        <template slot-scope="scope">
          <div>
            <el-tag
              size="medium"
              :type="scope.row.paperName==null ? 'warning' : 'success'"
            >{{scope.row.paperName==null? "未分配":"已分配"}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="orderBill(scope.$index, tableData)"
            type="primary"
            size="small"
          >结账</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Dialog -->
    <el-dialog width="60%" title="订单结账" :visible.sync="dialogVisible" append-to-body>
      <el-divider content-position="center">外包订单结账</el-divider>
      <div class="bill-btn">
        <el-row type="flex" :gutter="20">
          <el-col>
            <el-button type="primary" plain @click="doOrderBill(1)">外包技术结账</el-button>
          </el-col>
          <el-col>
            <el-button type="primary" plain @click="doOrderBill(2)">外包论文结账</el-button>
          </el-col>
        </el-row>
      </div>
      <el-divider content-position="center">客户订单结账</el-divider>
      <div class="bill-btn">
        <el-row>
          <el-col>
            <el-button type="primary" plain @click="doOrderBill(3)">客户订单结账</el-button>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderBill } from "@/api/api";
export default {
  data() {
    return {
      tableData: [
        {
          id: "cce3bf6dc64741c68897b73acc6cdd35",
          shop: "严选",
          wantName: "优博大官坊",
          serviceQQ: null,
          customerQQ: null,
          projectName:
            "一种具有远场拾音及过滤本机播放声音的音频采集前端设计与实现",
          technology: "单片机",
          orderDate: "20190418120535",
          totalAmt: null,
          bookAmt: null,
          projectProcess: null,
          programAmt: null,
          paperTitle:
            "一种具有远场拾音及过滤本机播放声音的音频采集前端设计与实现",
          paperAmt: null,
          qq: null,
          programName: null,
          paperName: null,
          tel: null,
          orderBillStatue: null,
          docPath: null,
          docName: null,
          imagePath: null,
          remarks: null,
          flowNo: null,
          price: null
        }
      ],
      //结账订单号
      billOrderNo: "",
      dialogVisible: false
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    orderBill(index, tableData) {
      this.billOrderNo = tableData[index].orderNo;
      this.dialogVisible = true;
    },
    doOrderBill(type) {
      this.$confirm(
        "此操作将完成订单结账,默认你已经收到了完成的程序和论文 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var requestData = { type: type };
          orderBill(requestData)
            .then(res => {
              this.$message({
                type: "success",
                message: "结账成功！"
              });
              this.dialogVisible=false;
            })
            .catch(res => {
              this.$message({
                type: "error",
                message: res.message
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style>
.bill-btn {
  width: 60%;
  margin: 20px auto;
}
</style>