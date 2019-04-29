<template>
  <div class="hello">
		
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.box {
		width: 200px;
		height: 200px;
		background: #42b983;
		.box1 {
			width: 100px;
			height: 100px;
			background: red;
			.box2 {
				width: 50px;
				height: 50px;
				background: blue;
			}
		}
	}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
