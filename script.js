import http from 'k6/http';
import { check, sleep } from 'k6';


// Key configurations for avg load test in this section
// SIMPLE LOAD TEST
const TEST_OPTION_1 = [
  { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 30 seconds.
  { duration: '20m', target: 100 }, // stay at 100 users for 2 minutes
  { duration: '5m', target: 0 }, // ramp-down to 0 users
  // { duration: '30s', target: 100 }, // traffic ramp-up from 1 to 100 users over 30 seconds.
  // { duration: '2m', target: 100 }, // stay at 100 users for 2 minutes
  // { duration: '40s', target: 0 }, // ramp-down to 0 users
]

// LOAD TEST: Kiểm tra tải. 
// Giống như việc cho ngày càng nhiều xe lên cầu để xem 
// nó có thể chịu được bao nhiêu trọng lượng trước khi trở nên chậm hoặc gặp khó khăn. 
// Nó giúp đánh giá khả năng của hệ thống đối với lưu lượng truy cập bình thường và cao hơn một chút.

// Cài đặt: Tăng dần lượng request lên 200 trong vòng 5m và duy trì ở mức này trong 20m
// sau đó giảm hẳn về 0
// Lưu ý, duration nên để theo đơn vị phút, vì với phương pháp test này, thì lượng request nên tăng từ từ 
// không nên tăng đột ngột 
const TEST_OPTION_2 = [
  { duration: '5m', target: 200 }, // traffic ramp-up from 1 to 200 users over 5 minutes .
  { duration: '20m', target: 200 }, // stay at 200 users for 20 minutes
  { duration: '5m', target: 0 }, // ramp-down to 0 users
]

// STRESS TEST: Kiểm tra tính căng thẳng của server
// Giống như việc quá tải cầu với nhiều xe hơn nhiều so với thiết kế. 
// Nó đẩy hệ thống đến giới hạn để xem liệu nó có bị hỏng và cách nó phục hồi hay không. 
// Mục tiêu là xác định các điểm yếu trước khi gặp áp lực thực tế.

// Cài đặt: tăng lượng request lên 200, 800 và 1000 lần lượt mỗi 5 phút
const TEST_OPTION_3 = [
  { duration: '1m', target: 200 }, // ramp up
  { duration: '5m', target: 200 }, // stable
  { duration: '1m', target: 800 }, // ramp up
  { duration: '5m', target: 800 }, // stable
  { duration: '1m', target: 1000 }, // ramp up
  { duration: '5m', target: 1000 }, // stable
  { duration: '5m', target: 0 }, // ramp down
]

// SPIKE TEST: Phương pháp kiểm tra đột biến, nghĩa là lượng request tăng đột ngột
// Giống như việc đột ngột cho nhiều xe lên cầu cùng một lúc. 
// Nó kiểm tra cách hệ thống xử lý các đợt truy cập đột ngột, mô phỏng sự gia tăng đột ngột hoạt động của người dùng

// Cài đặt: Nhanh chóng đẩy lượng request tăng đột biến trong 30s
// và duy trì lượng lớn request này trong vòng 2m
// sau đó nhanh tróng giảm lượng request về 0 trong 30s
const TEST_OPTION_4 = [
  { duration: '30s', target: 2000 }, // ramp up
  { duration: '2m', target: 2000 }, // stable
  { duration: '30s', target: 0 }, // ramp down
]

export const options = {
  stages: TEST_OPTION_1
};

const userIds = [
  '65e8338c34df285397fd0b34',// dongnv
  '65d867254422e71a0d9e7e28', // vinhx
  '65e8349d34df285397fd0b37', // truong
  '65e8328034df285397fd0b31' // thien
]

const projectId = '66692abcc5234477b9afa99b'

const domain = 'https://api.namviek.com/api'

export default () => {
  const randIdx = Math.round(Math.random() * 3)
  const uid = userIds[randIdx]
  const data = {
    projectId,
    assigneeIds: [uid]
  }
  // const urlRes = http.get('https://test-api.k6.io');
  const urlRes = http.post(`${domain}/test-perf/load-test`, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
  // Verify response
  check(urlRes, {
    'status is 200': (r) => r.status === 200,
    'returned values': (r) => r.json().data && r.json().data.length > 0,
  });

  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};

