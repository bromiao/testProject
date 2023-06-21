<!--iframe带token信息的url-->
<template>
  <div>
    <iframe id="iframe" src="" style="width: 500px; height: 500px" />
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      var iframe = document.querySelector("#iframe");
      this.populateIframe(iframe, [["Token", localStorage.getItem("token")]]);
    }, 0);
  },
  methods: {
    populateIframe(iframe, headers) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "api/home.chat/chat?type=1");
      xhr.responseType = "blob";
      headers.forEach((header) => {
        xhr.setRequestHeader(header[0], header[1]);
      });
      xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE) {
          console.log(xhr.response);
          if (xhr.status === 200) {
            iframe.src = URL.createObjectURL(xhr.response);
          }
        }
      };
      xhr.send();
    },
  },
};
</script>

<style></style>