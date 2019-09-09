<template>
  <div class="messagebox">
    <h2>{{title}}</h2>
    <p>{{content}}</p>
    <div>
      <div @click="handleCancel">
        {{cancel}}
      </div>
      <div @click="handleOk">
        {{ok}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox'
}
</script>

<style lang="scss" scoped>
.messagebox {
  width: 200px;
  height: 120px;
  border: 1px #ccc solid;
  border-radius: 4px;
  background-color: white;
  box-shadow: 3px #ccc;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -60px 0 0 -100px;
  h2 {
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
  p {
    text-align: center;
    line-height: 40px;
  }
  > div {
    display: flex;
    position: absolute;
    bottom: 0;
    border-top: 1px #ccc solid;
    width: 100%;
    div {
      flex: 1;
      text-align: center;
      line-height: 30px;
      border-right: 1px #ccc solid;
    }
    div:last-child {
      border: none;
    }
  }
}
</style>