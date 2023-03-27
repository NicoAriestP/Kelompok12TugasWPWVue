<style scoped>
</style>
<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="card border-0 rounded shadow-lg" id="card-container">
                    <div class="card-body">
                        <h4>Data Barang</h4>
                        <hr>
                        <Popup v-if="show">
                            Berhasil {{ msgBox }}
                        </Popup>
                        <button type="button" class="btn btn-md btn-success mx-2" data-bs-toggle="modal" data-bs-target="#tambahModal">Tambah</button>
                        <!-- <button type="button" class="btn btn-xs btn-secondary" @click="show = false">Tutup</button> -->
                        <table class="table table-responsive table-bordered mt-4 border-1">
                            <thead class="thead bg-dark text-light">
                                <tr>
                                    <div class="row">
                                      <div class="col-1">
                                        <th scope="col">No</th>
                                      </div>
                                      <div class="col-2">
                                        <th scope="col">Nama</th>
                                      </div>
                                      <div class="col-2">
                                        <th scope="col">Kategori</th>
                                      </div>
                                      <div class="col-2">
                                        <th scope="col">Harga</th>
                                      </div>
                                      <div class="col-1">
                                        <th scope="col">Stok</th>
                                      </div>
                                      <div class="col-2">
                                        <th scope="col">Pajak</th>
                                      </div>
                                      <div class="col-2">
                                        <th scope="col">Aksi</th>
                                      </div>
                                    </div>
                                </tr>
                                
                            </thead>
                            <tbody>
                                <tr v-for="(barang, index) in barangs" :key="index">
                                    <div class="row">
                                        <div class="col-1"><td>{{ index + 1 }}</td></div>
                                        <div class="col-2"><td>{{ barang.name }}</td></div>
                                        <div class="col-2"><td>{{ barang.category }}</td></div>
                                        <div class="col-2"><td>Rp. {{ barang.price.toLocaleString("id-ID") }}</td></div>
                                        <div class="col-1"><td>{{ barang.quantity }}</td></div>
                                        <div class="col-2">
                                          <td v-if="barang.tax == 'free'">Bebas Pajak</td>
                                          <td v-if="barang.tax == 'ppn'">PPN (10%)</td>
                                          <td v-if="barang.tax == 'pph'">PPH (2%)</td>
                                        </div>
                                        <div class="col-2"><td class="text-center">
                                        <button type="button" class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" @click="editBarang(index)" data-bs-target="#editModal">
                                          Edit
                                        </button>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deleteBarang(index)">Delete</button>
                                          </td></div>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- Modal untuk Tambah -->
<div class="modal fade" id="tambahModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Barang</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group mb-2">
              <label for="title" class="font-weight-bold mb-2">Nama</label>
              <input type="text" class="form-control" v-model="newBarang.name" placeholder="Masukkan Nama Barang">
          </div>
          <div class="form-group mb-2">
              <label for="title" class="font-weight-bold">Kategori</label>
              <select class="form-select" v-model="newBarang.category" aria-label="Default select example">
                <option selected disabled>Pilih Kategori</option>
                <option v-for="category in categories" :value="category">{{ category }}</option>
              </select>
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Harga</label>
              <input type="text" class="form-control" rows="4" v-model="newBarang.price" placeholder="Masukkan Harga Barang">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Stok</label>
              <input type="number" class="form-control" rows="4" v-model="newBarang.quantity" placeholder="Masukkan Stok Barang">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Pajak</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="newBarang.tax" value="ppn">
            <label class="form-check-label" for="inlineRadio1">PPN 10%</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="newBarang.tax" value="pph">
            <label class="form-check-label" for="inlineRadio1">PPH 21 (2%)</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="newBarang.tax" value="free">
            <label class="form-check-label" for="inlineRadio1">Bebas Pajak</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" @click="tutupModal" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        <button type="button" @click="insertBarang" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal untuk Edit -->
<div class="modal fade" ref="formDialog" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Barang</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group mb-2">
              <label for="title" class="font-weight-bold">Nama</label>
              <input type="text" class="form-control" v-model="changeBarang.name" placeholder="Masukkan Nama Barang">
          </div>
          <div class="form-group mb-2">
              <label for="title" class="font-weight-bold">Kategori</label>
              <select class="form-select" v-model="changeBarang.category" aria-label="Default select example">
                <option selected disabled>{{ changeBarang.category }}</option>
                <option v-for="category in categories" :value="category">{{ category }}</option>
              </select>
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold">Harga</label>
              <input type="text" class="form-control" rows="4" v-model="changeBarang.price" placeholder="Masukkan Harga Barang">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold">Stok</label>
              <input type="number" class="form-control" rows="4" v-model="changeBarang.quantity" placeholder="Masukkan Stok Barang">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Pajak</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="changeBarang.tax" value="ppn">
            <label class="form-check-label" for="inlineRadio1">PPN 10%</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="changeBarang.tax" value="pph">
            <label class="form-check-label" for="inlineRadio1">PPH 21 (2%)</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="changeBarang.tax" value="free">
            <label class="form-check-label" for="inlineRadio1">Bebas Pajak</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" @click="tutupModal" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        <button type="button" @click="updateBarang" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
    import Popup from './components/Popup.vue'
    export default {
        data: () => ({
            newBarang: {
                name: '' ,
                category:'Pilih Kategori',
                price: '' ,
                quantity:1,
                tax:'free'
            },
            changeBarang: {
                id:null,
                name: '' ,
                category:'',
                price: '' ,
                quantity:1 ,
                tax:''
            },
            msgBox: '',
            show: false,
            validation: [],
            categories: ['Elektronik', 'Fashion', 'Makanan & Minuman', 'Alat Mandi', 'Snack'],
            barangs: [
                {
                    "id": 1,
                    "name": "T-Shirt",
                    "price": 15000,
                    "quantity": 50,
                    "category": "Clothing",
                    "tax": "free",
                },
                {
                    "id": 2,
                    "name": "Jeans",
                    "price": 40000,
                    "quantity": 20,
                    "category": "Clothing",
                    "tax": "ppn",
                },
                {
                    "id": 3,
                    "name": "Sneakers",
                    "price": 60000,
                    "quantity": 10,
                    "category": "Footwear",
                    "tax": "pph",
                },
                {
                    "id": 4,
                    "name": "Hoodie",
                    "price": 40000,
                    "quantity": 30,
                    "category": "Clothing",
                    "tax": "pph",
                },
                {
                    "id": 5,
                    "name": "Jacket",
                    "price": 80000,
                    "quantity": 15,
                    "category": "Clothing",
                    "tax": "free",
                },
            ],
        }),
        created() {
            this.show = false
        },
        components: { Popup },
        methods: {
            insertBarang() {
                if(this.newBarang.name == "" && this.newBarang.price == ""){
                    alert("Lengkapi semua data")
                }else{
                    this.barangs.push({
                        "id": this.barangs.length + 1,
                        "name": this.newBarang.name,
                        "category": this.newBarang.category,
                        "price": this.newBarang.price,
                        "quantity": this.newBarang.quantity,
                        "tax": this.newBarang.tax
                    })
                    this.msgBox = 'tambah data'
                    this.tutupModal()
                    this.popup()
                }
            },
            editBarang(index) {
                this.changeBarang.id = index
                this.changeBarang.name = this.barangs[index].name
                this.changeBarang.category = this.barangs[index].category
                this.changeBarang.price = this.barangs[index].price
                this.changeBarang.quantity = this.barangs[index].quantity
                this.changeBarang.tax = this.barangs[index].tax
            },
            updateBarang() {
                if(this.changeBarang.name == "" && this.changeBarang.price == ""){
                    alert("Lengkapi semua data")
                }else{
                    this.barangs[this.changeBarang.id].name = this.changeBarang.name
                    this.barangs[this.changeBarang.id].category = this.changeBarang.category
                    this.barangs[this.changeBarang.id].price = this.changeBarang.price
                    this.barangs[this.changeBarang.id].quantity = this.changeBarang.quantity
                    this.barangs[this.changeBarang.id].tax = this.changeBarang.tax

                    this.msgBox = 'edit data'
                    this.tutupModal()
                    this.popup()
                }
            },
            tutupModal() {
                this.newBarang.name = ''
                this.newBarang.category = 'Pilih Kategori'
                this.newBarang.price = ''
                this.newBarang.quantity = 1
                this.newBarang.tax = 'free'
                this.changeBarang.name = ''
                this.changeBarang.category = ''
                this.changeBarang.price = ''
                this.changeBarang.quantity = 1
                this.changeBarang.tax = ''

                document.getElementById('tambahModal').classList.remove("show")
                document.getElementById('tambahModal').style.display = "none";

                document.getElementById('editModal').classList.remove("show")
                document.getElementById('editModal').style.display = "none";
                document.querySelector('.modal-backdrop').remove();
            },
            deleteBarang(idx) {
                this.barangs.splice(idx, 1);
                this.msgBox = 'hapus data'
            },
            popup() {
                this.show = true
                // this.show = false
                // setTimeout(() => {
                // }, 2000);
                // setTimeout(() => {
                // }, 2000);
            }
        },
    }
</script>