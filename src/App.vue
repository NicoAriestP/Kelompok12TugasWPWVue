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
                                    <div class="col-4"><th scope="col">Nama</th></div>
                                    <div class="col-4"><th scope="col">Harga</th></div>
                                    <div class="col-2 "><th scope="col">Stok</th></div>
                                    <div class="col-2 "><th scope="col">Aksi</th></div>
                                    </div>
                                </tr>
                                
                            </thead>
                            <tbody>
                                <tr v-for="(barang, index) in barangs" :key="index">
                                    <div class="row">
                                        <div class="col-4"><td>{{ barang.name }}</td></div>
                                        <div class="col-4"><td>{{ barang.price }}</td></div>
                                        <div class="col-2"><td>{{ barang.quantity }}</td></div>
                                        <div class="col-2"><td class="text-center">
                                        <button type="button" class="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#editModal">
                                          Edit
                                        </button>
                                        <button @click.prevent="postDelete(barang.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
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
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
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
        ...
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
import {onMounted,ref} from 'vue'
export default {
    setup() {
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

        //state posts
        const newBarang = ref({
            name: '' ,
            price: '' ,
            quantity:1 ,
        })
        //state validation
        const validation = ref([])

        //mounted
        // onMounted(() => {
        //     //get API from Laravel Backend
        //     axios.get('http://127.0.0.1:8000/api/barang')
        //     .then(response => {
        //       console.log(response.data)
        //       //assign state posts with response data
        //       barangs.value = response.data.barang
        //     }).catch(error => {
        //         console.log(error.response.data)
        //     })
        // })

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
            postDelete
        }
    }
}
</script>