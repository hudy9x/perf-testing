## Performance Testing Scripts

### Using k6 for testing

Install k6 before running any tests. Visit [here](https://grafana.com/docs/k6/latest/set-up/install-k6/) if you don't find your setup guide
```
$ brew install k6
```

Now you can run tests as follow

```
$ k6 run script.js

✔︎ perf-testing k6 run script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: script.js
        output: -

     scenarios: (100.00%) 1 scenario, 100 max VUs, 3m40s max duration (incl. graceful stop):
              * default: Up to 100 looping VUs for 3m10s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 119 MB 625 kB/s
     data_sent......................: 1.1 MB 5.8 kB/s
     http_req_blocked...............: avg=8.33ms   min=0s       med=6µs      max=758.32ms p(90)=12µs    p(95)=14µs
     http_req_connecting............: avg=543.85µs min=0s       med=0s       max=114.7ms  p(90)=0s      p(95)=0s
     http_req_duration..............: avg=497.79ms min=240.82ms med=319.59ms max=7.3s     p(90)=625.2ms p(95)=1.18s
       { expected_response:true }...: avg=497.79ms min=240.82ms med=319.59ms max=7.3s     p(90)=625.2ms p(95)=1.18s
     http_req_failed................: 0.00%  ✓ 0         ✗ 10348
     http_req_receiving.............: avg=12.57ms  min=7µs      med=77µs     max=842.23ms p(90)=195µs   p(95)=123.57ms
     http_req_sending...............: avg=30.39µs  min=2µs      med=27µs     max=920µs    p(90)=49µs    p(95)=58µs
     http_req_tls_handshaking.......: avg=7.77ms   min=0s       med=0s       max=690.64ms p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=485.18ms min=237.65ms med=316.48ms max=7.3s     p(90)=608.4ms p(95)=1.17s
     http_reqs......................: 10348  54.202348/s
     iteration_duration.............: avg=1.5s     min=1.24s    med=1.32s    max=8.3s     p(90)=1.69s   p(95)=2.22s
     iterations.....................: 10348  54.202348/s
     vus............................: 2      min=2       max=100
     vus_max........................: 100    min=100     max=100


```
