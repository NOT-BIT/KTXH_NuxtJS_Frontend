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
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.ma" label="Mã tỉnh*"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field v-model="editedItem.ten" label="Tỉnh*"></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-select
                :items="donViHanhChinh"
                v-model="editedItem.sysCapDonViHanhChinhId"
                label="Cấp đơn vị hành chính"
                outlined
                ></v-select>
                </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
                <v-select
                :items="loaidonViHanhChinh"
                v-model="editedItem.loaiDonViHanhChinh"
                label="Loại đơn vị hành chính"
                outlined
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-switch
                v-model="editedItem.nongThon"
                class="ma-1"
                label="Thành Thị - Nông thôn"
              ></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-switch
                v-model="editedItem.bienGioi"
                class="ma-1"
                label="Biên giới"
              ></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-switch
                v-model="editedItem.haiDao"
                class="ma-1"
                label="Hải đảo"
              ></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-switch
                v-model="editedItem.vungDBKhoKhan"
                class="ma-1"
                label="Vùng đặc biệt khó khăn"
              ></v-switch>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="12">
                <v-textarea v-model="editedItem.ghiChu" label="Ghi Chú"></v-textarea>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6" md="8">
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
        title: 'Khai Báo Từ Điển: Tỉnh',
        dialog: false,
        operators: operators,
        search: {
        },
        donViHanhChinh: [
            'Cấp tỉnh',
            'Cấp huyện',
            'Cấp Xã',
            'Đặc khu kinh tế'
        ],
        loaidonViHanhChinh: [
            'Loại I',
            'Loại II',
            'Loại III'
        ],
        headers: [
            { text: 'STT', align: 'left', sorttable: true, value:'id'},
            { text: 'Mã định danh', align: 'left', sorttable: true, value:'ma'},
            { text: 'Tên', align: 'left', sorttable: false, value:'ten'},
            { text: 'Ghi Chú', align: 'left', sorttable: false, value:'ghiChu'},
            { text: 'Hiệu lực', align: 'left', sorttable: true, value:'hieuLuc'},
            { text: 'Thao Tác', align: 'left',  value:'action'}
        ],
        editedIndex: -1,
        editedItem: {
          ma: '',
          ten: '',
          sysCapDonViHanhChinhId: 0,
          loaiDonViHanhChinh: '',
          nongThon: 1,
          bienGioi: 0,
          haiDao: 0,
          vungDBKhoKhan: 0,
          ghiChu: '',
          hieuLuc: 1,
          xoa: 0
        },
        defaultItem: {
          ma: '',
          ten: '',
          sysCapDonViHanhChinhId: 0,
          loaiDonViHanhChinh: '',
          nongThon: 1,
          bienGioi: 0,
          haiDao: 0,
          vungDBKhoKhan: 0,
          ghiChu: '',
          hieuLuc: 1,
          xoa: 0
        }
      }
    },
    computed: {
      ...mapState("qcTinh", ["tinhList", "pagination"]),
      formTitle () {
        return this.editedIndex === -1 ? 'Thêm mới' : 'Cập nhật chi tiết'
      },
    },

    asyncData({ store }) {
      store.dispatch("qcTinh/getQCTinhList");
    },

    created() {
      this.getQCTinhList();
    },

    methods: {
      ...mapActions("qcTinh", [
        "getQCTinhList",
        "getQCTinh",
        "addQCTinh",
        "updateQCTinh",
        "deleteQCTinh",
        "restoreQCTinh"
      ]),

      getClass(index) {
        if (!index) return "text-left";
        else return "text-start";
      },
      add() {
        this.dialog = true
      },
      edit(item) {
        this.addQCTinh(this.editedIndex)
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      delete(tiem) {
        const index = this.items.indexOf(item)
        confirm('Xác nhận xóa?') && this.items.splice(index, 1)
        this.deleteQCTinh(this.editedItem)
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