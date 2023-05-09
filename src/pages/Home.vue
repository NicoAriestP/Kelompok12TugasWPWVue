<template>
    <h1>hai</h1>
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