import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "/",
  timeout: 60000,
});

service.defaults.headers.get["contentType"] =
  "application/x-www-form-urlencoded";
service.defaults.headers.post["contentType"] = "application/json";
service.defaults.headers.put["contentType"] = "application/json";
service.defaults.headers.delete["contentType"] = "application/json";
service.defaults.headers.common["Accept-Language"] = "zh-CN,zh;q=0.9";

service.interceptors.request.use((config: any) => {
  let token = localStorage.getItem("token");
  if (token) {
    token = `Bearer ${token}`;
    // console.log('request-_token',_token)
  } else {
    token = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE2ODY2MTk2MDI5MzE0MjkzNzcsInVzZXJfbmFtZSI6InNocjEiLCJzY29wZSI6WyJhbGwiXSwibmlja25hbWUiOiJzaHIiLCJleHAiOjE2OTIzNDQyOTAsImF1dGhvcml0aWVzIjpbIm1lZGljYWwtaW50ZXJjb206cGF0aWVudC1tYW5hZ2UiLCJtZWRpYS1wdWJsaXNoOmFkbWluIiwibWVkaWNhbC1pbnRlcmNvbTpob3NwaXRhbC1tYW5hZ2UiLCJzbWFydC1wb3dlcjphZG1pbiIsImRldmljZS1tYW5hZ2VyOmFkbWluIiwiaGlkZGVuLXBvd2VyOmFkbWluIiwiYmFzZS1kYXRhOm9wZXJhdG9yIiwiZGV2aWNlLW1hbmFnZXI6YWRtaW4tcGFyZW50IiwibWVkaWNhbC1pbnRlcmNvbTptZWRpY2FsLW1hbmFnZSIsImJhc2UtZGF0YTphZG1pbiIsImhvbWUtc21hcnQ6YWRtaW4iLCJzaGlmdC1wb3dlcjphZG1pbiIsIm1lZGljYWwtaW50ZXJjb206Y2FsbC1tYW5hZ2UiLCJhdXRoLXNlcnZpY2U6YWRtaW4iLCJtZWRpY2FsLWludGVyY29tOnN5c3RlbS1tYW5hZ2UiLCJ2aWRlby1wbGF0Zm9ybTphZG1pbiIsIm1lZGljYWwtaW50ZXJjb206YnJvYWRjYXN0LW1hbmFnZSIsImF1dGgtc2VydmljZTpvcGVyYXRvciIsIm1lZGljYWwtaW50ZXJjb206ZGV2aWNlLW1hbmFnZSJdLCJqdGkiOiJlYzI0YmJmYi0yY2EwLTRhNjQtOWQ2OC05OTExMDhjOTUxMDMiLCJjbGllbnRfaWQiOiJ3ZWIifQ.kMbPujCgBFcb-qZzpcde7ziSHTRQn6qWe3qerTE50McIqrfW1eoo2JonvoLIqGDVnDrvHt1HrGGNUkvF0uvc-x-LshXHnAluiPmd2V4i5B1pbW1FnbrURcFmpa6Fv7Cu-hF_B3BDMTK6YbninLkEzyv7-84Spg4Kc_oJUoC1TO1gz0vQqKA13CS9ARp6JohRuM7SdDZ9g9Tu2bjJWEzIAsaz3ifABrDqpw4VaRBlSHI56p8KSsjcIgUnir7a3Dq9Og4xM5YkBbAlij0LaNvxKtkrhxfcbEhHUT-Mbz2iTmFwR64uvGhFyA7hgdLDOLedB_znrDTXmmGr9BOyg8oxDQ`;
  }
  config.headers["Authorization"] = token;
  return config;
});

service.interceptors.response.use(
  (response: any) => {
    let res = response.data;
    if (res.success) {
      return Promise.resolve(res);
    }
    if (res.code == "1000009") {
      // window.$wujie.props.logout()
    }
    return response;
  },
  async (error) => {
    let _message =
      error?.response?.data?.message ||
      error.message ||
      error.response?.data?.message ||
      error.response?.data?.msg ||
      "接口获取失败";
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      _message = "请求超时，请检查网络再重新连接";
    }

    ElMessage({
      showClose: true,
      message: _message,
      type: "error",
      duration: 3 * 1000,
    });

    return Promise.reject(error);
  }
);
export default service;
