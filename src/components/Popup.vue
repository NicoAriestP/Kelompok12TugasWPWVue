<template>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Success!</strong> <slot />
    </div>
</template>

<style scoped>
.popup-box {
    color: #666;
    border: 1px solid green;
    border-radius: 4px;
    padding: 20px;
    background-color: #f8f8f8;
}

strong {
	color: green;    
}
</style>