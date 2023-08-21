<template>
  <video id="video" autoplay></video>
</template>

<script>
// import "../../public/static/webrtcstreamer"
// import "../../public/static/adapter.min.js"
export default {
  name: "HomeView",
  data() {
    return {
      webRtcServer: null,
    };
  },
  mounted() {
    //192.168.1.100是启动webrtc-streamer的服务器IP，8000是webrtc-streamer的默认端口号，可以在服务端启动的时候更改的
    this.webRtcServer = new WebRtcStreamer(
      "video",
      "http://192.168.10.110:8000"
    );
    //需要看的rtsp视频地址，可以在网上找在线的rtsp视频地址来进行demo实验，在vlc中能播放就能用
    // this.webRtcServer.connect(
    //   "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4"
    // );
    this.webRtcServer.connect(
      "rtsp://admin:admin123@192.168.13.66:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1"
    );
    //第二个视频
    //根据不同的video标签来控制
    // this.webRtcServer1 = new WebRtcStreamer(
    //   "video1",
    //   "http://192.168.10.110:8000"
    // );
    // this.webRtcServer1.connect(
    //   "rtsp://admin:admin123@192.168.13.66:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1"
    // );
  },
  methods: {},
  beforeDestroy() {
    this.webRtcServer.disconnect();
    this.webRtcServer = null;
  },
};
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  height: 100%;
}
</style>
