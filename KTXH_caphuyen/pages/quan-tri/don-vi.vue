<template>
    <Table 
    :title="title" 
    :headers="headers"
    :items="items"
    @edit="edit($event)"
    @delete="deleted($event)"
    @add="add($event)">
  
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }">
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ma" label="Mã Đơn Vị*" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ten" label="Tên Đơn Vị*" ></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.donViChaId" label="Đơn Vị Cha*" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.diaChi" label="Địa Chỉ"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.sdt" label="Số Điện Thoại"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú" ></v-textarea>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-switch
                  v-model="editedItem.laDonVi"
                  class="ma-1"
                  label="Là Đơn Vị"
                ></v-switch>
              </v-col>  
              <v-col cols="12" sm="6" md="8">
                <v-switch
                  v-model="editedItem.hieuLuc"
                  class="ma-1"
                  label="Hiệu lực"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-switch
                  v-model="editedItem.xoa"
                  class="ma-1"
                  label="Xóa"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="close">Đóng</v-btn>
          <v-btn color="blue darken-1" text @click="save">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template slot="item.operator">
      <div>OKIE</div>
    </template>

    </Table>
</template>

<script>
import Table from '../../components/table.vue';
import { operators } from "..//..//util//operators";
import { mapState, mapActions } from "vuex";

export default {
    components: {
        Table
    },
    data() {
      return {
        title: 'Khai Báo Đơn Vị',
        operators: operators,
        search: {
        },
        headers: [
            { text: 'STT', align: 'left', sorttable: true, divider:true, value:'id'},
            { text: 'Mã đơn vị', align: 'left', divider:true, value:'ma'},
            { text: 'Tên đơn vị', align: 'left', value:'ten'},
            { text: 'Số điện thoại', align: 'left', value:'sdt'},
            { text: 'Nhóm đơn vị', align: 'left', value:'nhomdv'},
            { text: 'Hiệu lực', align: 'left', value:'hieuLuc'},
            { text: 'Thao Tác', align: 'left', value:'action'},
              ],
        editedIndex: -1,
        editedItem: {
          ma: '',
          ten: '',
          donViChaId: 0,
          diaChi: '',
          soDienThoai: '',
          email: '',
          ghiChu: '',
          laDonVi: false,
          hieuLuc: 1,
          xoa: 0
        },
        defaultItem: {
          ma: '',
          ten: '',
          donViChaId: 0,
          diaChi: '',
          soDienThoai: '',
          email: '',
          ghiChu: '',
          laDonVi: false,
          hieuLuc: 1,
          xoa: 0
        }
      }
    },
    computed: {
      ...mapState("qtDonVi", ["donViList", "pagination"]),
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật chi tiết'
      },
    },

    asyncData({ store }) {
      store.dispatch("qtDonVi/getQTDonViList");
    },

    created() {
      this.getQTDonViList();
    },

    methods: {
      ...mapActions("qtDonVi", [
        "getQTDonViList",
        "getQTDonVi",
        "addQTDonVi",
        "updateQTDonVi",
        "deleteQTDonVi",
        "restoreQTDonVi"
      ]),

      getClass(index) {
        if (!index) return "text-left";
        else return "text-start";
      },
      add() {
        this.dialog = true
      },
      edit(item) {
        this.addQTDonVi(this.editedIndex)
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      delete(tiem) {
        const index = this.items.indexOf(item)
        confirm('Xác nhận xóa?') && this.items.splice(index, 1)
        this.deleteQTDonVi(this.editedItem)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        this.close()
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    }
}
</script>