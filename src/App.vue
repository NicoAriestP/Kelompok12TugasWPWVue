<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="card border-0 rounded shadow-lg">
                    <div class="card-body">
                        <h4>Data Barang</h4>
                        <hr>
                        <button type="button" class="btn btn-md btn-success mx-2" data-bs-toggle="modal" data-bs-target="#tambahModal">Tambah</button>

                        <table class="table table-responsive table-bordered mt-4 border-1">
                            <thead class="thead bg-dark text-light">
                                
                                <tr>
                                    <div class="row">
                                      <div class="col-1">
                                        <th scope="col">No</th>
                                      </div>
                                      <div class="col-3">
                                        <th scope="col">Nama</th>
                                      </div>
                                      <div class="col-3">
                                        <th scope="col">Harga</th>
                                      </div>
                                      <div class="col-2">
                                        <th scope="col">Stok</th>
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
                                        <div class="col-3"><td>{{ barang.name }}</td></div>
                                        <div class="col-3"><td>Rp. {{ barang.price }}</td></div>
                                        <div class="col-2"><td>{{ barang.quantity }}</td></div>
                                        <div class="col-2"><td class="text-center">
                                        <button type="button" class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#editModal">
                                          Edit
                                        </button>
                                        <button @click.prevent="postDelete(barang.id)" class="btn btn-sm btn-danger ml-1">Delete</button>
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
              <label for="content" class="font-weight-bold mb-2">Harga</label>
              <input type="text" class="form-control" rows="4" v-model="newBarang.price" placeholder="Masukkan Harga Barang">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold mb-2">Stok</label>
              <input type="number" class="form-control" rows="4" v-model="newBarang.quantity" placeholder="Masukkan Stok Barang">
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
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group mb-2">
              <label for="title" class="font-weight-bold">NAMA</label>
              <input type="text" class="form-control" v-model="newBarang.name" placeholder="Masukkan Nama Barang">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold">Harga</label>
              <input type="text" class="form-control" rows="4" v-model="newBarang.price" placeholder="Masukkan Harga Barang">
          </div>
          <div class="form-group mb-2">
              <label for="content" class="font-weight-bold">Stok</label>
              <input type="number" class="form-control" rows="4" v-model="newBarang.quantity" placeholder="Masukkan Stok Barang">
          </div>
          <button type="submit" class="btn btn-success btn-sm">SIMPAN</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {reactive, onMounted, ref} from 'vue'
export default {
    setup() {
        //state posts
        const newBarang = reactive({
            name: '' ,
            price: '' ,
            quantity:1 ,
        })
        //state validation
        const validation = ref([])


        //reactive state
        let barangs = ref([
              {
                "id": 1,
                "name": "T-Shirt",
                "price": 15.99,
                "quantity": 50
              },
              {
                "id": 2,
                "name": "Jeans",
                "price": 39.99,
                "quantity": 20
              },
              {
                "id": 3,
                "name": "Sneakers",
                "price": 59.99,
                "quantity": 10
              },
              {
                "id": 4,
                "name": "Hoodie",
                "price": 29.99,
                "quantity": 30
              },
              {
                "id": 5,
                "name": "Jacket",
                "price": 79.99,
                "quantity": 15
              },
              {
                "id": 6,
                "name": "Dress",
                "price": 49.99,
                "quantity": 25
              },
              {
                "id": 7,
                "name": "Boots",
                "price": 89.99,
                "quantity": 5
              },
              {
                "id": 8,
                "name": "Sweater",
                "price": 19.99,
                "quantity": 40
              },
              {
                "id": 9,
                "name": "Shorts",
                "price": 24.99,
                "quantity": 35
              },
              {
                "id": 10,
                "name": "Sandals",
                "price": 14.99,
                "quantity": 50
              }
          ])

        function tutupModal(){
          newBarang.name = ''
          newBarang.price = ''
          newBarang.quantity = 1
        }

        function insertBarang(){
          if(newBarang.name == "" && newBarang.price == ""){
            alert("Lengkapi semua data")
          }else{
            barangs.value.push({
              "id": barangs.length + 1,
              "name": newBarang.name,
              "price": newBarang.price,
              "quantity": newBarang.quantity
            });
            tutupModal();
          }
        }

        function postDelete(id) {       
           //delete data post by ID
          //  if (confirm("Anda Yakin?")) {
          //   axios.delete(`http://127.0.0.1:8000/api/barang/${id}`)
          //   .then(() => {
          //     alert("Data Dihapus!") 
          //     //splice posts 
          //     //find post index
          //     const index = this.barangs.findIndex(barang => barang.id === id)
          //     if (~index) {
          //     // if the post exists in array
          //     this.barangs.splice(index, 1)
          //     }
          //   })
          //     .catch(error => {
          //         console.log(error.response.data)
          //     })
          // }
        }


        //return
        return {
            barangs,
            newBarang,
            validation,
            postDelete,
            tutupModal,
            insertBarang
        }
    }
}
</script>