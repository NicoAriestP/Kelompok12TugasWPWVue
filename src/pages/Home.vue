<template>

    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="card border-0 rounded shadow-lg" id="card-container">
                    <div class="card-body">
                        <h4>Data Barang</h4>
                        <hr>
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-md btn-success mx-2" data-bs-toggle="modal" data-bs-target="#tambahModal">Tambah</button>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" id="search" v-model="query" @keyup="onSearch" placeholder="Cari produk disini..">
                            </div>
                        </div>
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
                                        <button type="button" class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" @click="editBarang(barang.id)" data-bs-target="#editModal">
                                          Edit
                                        </button>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deleteBarang(barang.id)">Delete</button>
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
              <input type="text" class="form-control" v-model="newBarang.name" placeholder="Masukkan Nama Barang" :disabled="disabled">
          </div>
          <div class="form-group mb-2">
              <label for="title" class="font-weight-bold">Kategori</label>
              <select class="form-select" v-model="newBarang.category" aria-label="Default select example" :disabled="disabled">
                <option selected disabled>Pilih Kategori</option>
                <option v-for="category in categories" :value="category">{{ category }}</option>
              </select>
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Harga</label>
              <input type="text" class="form-control" rows="4" v-model="newBarang.price" placeholder="Masukkan Harga Barang" required :disabled="disabled">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Stok</label>
              <input type="number" min="1" class="form-control" rows="4" v-model="newBarang.quantity" placeholder="Masukkan Stok Barang" :disabled="disabled">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Pajak</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="newBarang.tax" value="ppn" :disabled="disabled">
            <label class="form-check-label" for="inlineRadio1">PPN 10%</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="newBarang.tax" value="pph" :disabled="disabled">
            <label class="form-check-label" for="inlineRadio1">PPH 21 (2%)</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="newBarang.tax" value="free" :disabled="disabled">
            <label class="form-check-label" for="inlineRadio1">Bebas Pajak</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" @click="tutupModal" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        <button type="button" @click="insertBarang" :disabled="disabled" class="btn btn-primary">Simpan</button>
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
              <input type="text" class="form-control" v-model="changeBarang.name" placeholder="Masukkan Nama Barang" :disabled="disabled2">
          </div>
          <div class="form-group mb-2">
              <label for="title" class="font-weight-bold">Kategori</label>
              <select class="form-select" v-model="changeBarang.category" aria-label="Default select example" :disabled="disabled2">
                <option selected disabled>{{ changeBarang.category }}</option>
                <option v-for="category in categories" :value="category">{{ category }}</option>
              </select>
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold">Harga</label>
              <input type="text" class="form-control" rows="4" v-model="changeBarang.price" placeholder="Masukkan Harga Barang" :disabled="disabled2">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold">Stok</label>
              <input type="number" class="form-control" min="0" rows="4" v-model="changeBarang.quantity" placeholder="Masukkan Stok Barang" :disabled="disabled2">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Pajak</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="changeBarang.tax" value="ppn" :disabled="disabled2">
            <label class="form-check-label" for="inlineRadio1">PPN 10%</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="changeBarang.tax" value="pph" :disabled="disabled2">
            <label class="form-check-label" for="inlineRadio1">PPH 21 (2%)</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="changeBarang.tax" value="free" :disabled="disabled2">
            <label class="form-check-label" for="inlineRadio1">Bebas Pajak</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" @click="tutupModal" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        <button type="button" @click="updateBarang" class="btn btn-primary" :disabled="disabled2">Simpan</button>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
    import Swal from 'sweetalert2'
    import axios from 'axios'

    export default {
        name: "Home",
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
            barangs: [],
            disabled: false,
            disabled2: false,
            query: '',
            search: false
        }),
        mounted(){
            this.loadBarang()
        },
        created() {
            this.show = false
        },
        components: { 
            // Popup
        },
        methods: {
            loadBarang(){
                let url = '/products'

                if (this.search) {
                    url = '/products?q='+this.query
                }

                axios.get(url)
                    .then((res) => {
                        console.log(res)
                        this.barangs = res.data
                        this.search = false
                    })
                    .catch((err) => {
                        Swal.fire('Proses gagal', err, 'error')
                        return
                    })
            },
            onSearch(){
                this.search = true
                this.loadBarang()
            },
            insertBarang() {
              // Nama,Harga,Kategori Harus Diisi
                if (!this.newBarang.name || !this.newBarang.price || !this.newBarang.category) {
                  Swal.fire('Proses gagal!', 'Semua kolom harus diisi', 'error')
                  return
                }
                // Harga harus berupa angka
                else if (isNaN(this.newBarang.price)) {
                  Swal.fire('Proses gagal!', 'Harga harus diisi dengan angka', 'error')
                  return
                }
                // Harga tidak boleh kurang dari atau sama dengan 0 rupiah
                else if (this.newBarang.price <= 0) {
                  Swal.fire('Proses gagal!', 'Harga harus lebih besar dari 0', 'error')
                  return
                }
                // Stok tidak boleh kurang dari 0
                else if (this.newBarang.quantity < 0) {
                  Swal.fire('Proses gagal!', 'Stok harus lebih besar atau sama dengan dari 0', 'error')
                  return
                }else{
                    let getLastId = this.barangs[this.barangs.length - 1].id
                    let payloadData = {
                        "id": getLastId + 1,
                        "name": this.newBarang.name,
                        "price": this.newBarang.price,
                        "quantity": this.newBarang.quantity,
                        "category": this.newBarang.category,
                        "tax": this.newBarang.tax
                    }

                    this.disabled = true
                    axios.post('/products', payloadData)
                        .then((res) => {
                            this.disabled = false
                            console.log(res)
                            Swal.fire('Proses berhasil!', 'Berhasil tambah barang', 'success')
                            this.tutupModal()
                            this.loadBarang()
                        })
                }
            },
            editBarang(barang_id) {
                document.getElementById('editModal').style.display = "block";
                this.disabled2 = true
                axios.get('/products/' + barang_id)
                    .then((res) => {
                        this.disabled2 = false
                        console.log(res)
                        // this.barangs = res.data
                        this.changeBarang.id = barang_id
                        this.changeBarang.name = res.data.name
                        this.changeBarang.category = res.data.category
                        this.changeBarang.price = res.data.price
                        this.changeBarang.quantity = res.data.quantity
                        this.changeBarang.tax = res.data.tax
                    })
                    .catch((err) => {
                        Swal.fire('Proses gagal', err, 'error')
                        return
                    })
            },
            updateBarang() {
                if (!this.changeBarang.name || !this.changeBarang.price || !this.changeBarang.category) {
                  Swal.fire('Proses gagal!', 'Semua kolom harus diisi', 'error')
                  return
                }else if (isNaN(this.changeBarang.price)) {
                  Swal.fire('Proses gagal!', 'Harga harus diisi dengan angka', 'error')
                  return
                }else if (this.changeBarang.price <= 0) {
                  Swal.fire('Proses gagal!', 'Harga harus lebih besar dari 0', 'error')
                  return
                }else if (this.changeBarang.quantity <= 0) {
                  Swal.fire('Proses gagal!', 'Stok harus lebih besar dari 0', 'error')
                  return
                }else{
                    // this.barangs[this.changeBarang.id].name = this.changeBarang.name
                    // this.barangs[this.changeBarang.id].category = this.changeBarang.category
                    // this.barangs[this.changeBarang.id].price = this.changeBarang.price
                    // this.barangs[this.changeBarang.id].quantity = this.changeBarang.quantity
                    // this.barangs[this.changeBarang.id].tax = this.changeBarang.tax

                    let payloadData = {
                        "id": this.changeBarang.id,
                        "name": this.changeBarang.name,
                        "price": this.changeBarang.price,
                        "quantity": this.changeBarang.quantity,
                        "category": this.changeBarang.category,
                        "tax": this.changeBarang.tax
                    }

                    this.disabled2 = true
                    axios.put('/products/' + this.changeBarang.id, payloadData)
                        .then((res) => {
                            this.disabled2 = false
                            console.log(res)
                            Swal.fire('Proses berhasil!', 'Berhasil edit barang', 'success')
                            this.tutupModal()
                            this.loadBarang()
                        })
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

                const box = document.getElementById('wpw');
                box.removeAttribute('class');
                box.removeAttribute('style');
            },
            deleteBarang(barang_id) {
                // this.barangs.splice(idx, 1);
                // // this.msgBox = 'hapus data'
                // Swal.fire('Proses berhasil!', 'Berhasil hapus barang', 'success')

                Swal.fire({
                    title: "Konfirmasi",
                    text: "Anda yakin ingin hapus barang ini ?",
                    showCancelButton: true,
                    confirmButtonText: `Lanjutkan`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        axios.delete('/products/' + barang_id)
                        .then((res) => {
                            console.log(res)
                            Swal.fire('Proses berhasil!', 'Berhasil hapus barang', 'success')
                            this.loadBarang()
                        })
                    }
                });
            }
        },
    }
</script>
<style>
</style>