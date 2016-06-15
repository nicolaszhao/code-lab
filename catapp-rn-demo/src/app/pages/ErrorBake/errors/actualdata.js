/**
 * Created by mikejay on 15/9/9.
 */
var actualdata=
    {
        "des": {
            "errors": {
                "title": "",
                "errors": []
            },
            "details": {
                "title": " 150123 商旅火车票预订服务 ",
                "details": [
                    "URL 访问量 1 响应时间 200.0 (ms) ",
                    "SOA2Client 访问量 1 响应时间 100.0 (ms) "
                ]
            }
        },

        "edges": [
            {
                "dashed": false,
                "des": {
                    "errors": {
                        "title": "",
                        "errors": []
                    },
                    "details": {
                        "title": "SOA2Call 访问量 1 ",
                        "details": ["SOA2Call 响应时间 100.0 (ms) "]
                    }
                },
                "weight": 1,
                "status": 1,
                "opposite": false,
                "link": "",
                "target": "150122",
                "self": "150123",
                "type": "SOA2Call",
                "key": "SOA2Call:150123:150122"
            }
        ],
        "status": 1,
        "nodes": [
            {
                "domian": "150122",
                "des": {
                    "errors": {
                        "title": "",
                        "errors": []
                    },
                    "details": {
                        "title": " 150122 商旅Online火车票预订 ",
                        "details": ["URL 访问量 1 响应时间 699.0 (ms) "]
                    }
                },
                "weight": "?op=dependencyGraph&minute=54&domain=150122&date=2015091811",
                "status": 1,
                "link": "?op=dependencyGraph&minute=54&domain=150122&date=2015091811",
                "type": "project"
            }
        ],
        "domain": "150123",
        "type": "project"
    };



//{"des":["【 150123 商旅火车票预订服务 】","SOA2Client 访问量 10 响应时间 146.6 (ms) ","ESBClient 访问量 2 响应时间 454.5 (ms) "],"edges":[{"dashed":false,"des":["ESBCall 访问量 2 ","ESBCall 响应时间 1136.0 (ms) "],"weight":1,"status":1,"opposite":true,"link":"","target":"150122","self":"150123","type":"ESBCall","key":"ESBCall:150122:150123"},{"dashed":false,"des":["SOA2Call 访问量 3 ","SOA2Call 响应时间 301.3 (ms) "],"weight":1,"status":1,"opposite":false,"link":"","target":"200402","self":"150123","type":"SOA2Call","key":"SOA2Call:150123:200402"},{"dashed":false,"des":["SOA2Call 访问量 3 ","SOA2Call 响应时间 62.3 (ms) "],"weight":1,"status":1,"opposite":false,"link":"","target":"150226","self":"150123","type":"SOA2Call","key":"SOA2Call:150123:150226"},{"dashed":false,"des":["SOA2Call 访问量 1 ","SOA2Call 响应时间 191.0 (ms) "],"weight":1,"status":1,"opposite":false,"link":"","target":"200503","self":"150123","type":"SOA2Call","key":"SOA2Call:150123:200503"},{"dashed":false,"des":["ESBCall 访问量 2 ","ESBCall 响应时间 454.5 (ms) "],"weight":1,"status":1,"opposite":false,"link":"","target":"150219","self":"150123","type":"ESBCall","key":"ESBCall:150123:150219"},{"dashed":false,"des":["SOA2Call 访问量 3 ","SOA2Call 响应时间 61.3 (ms) "],"weight":1,"status":1,"opposite":false,"link":"","target":"921801","self":"150123","type":"SOA2Call","key":"SOA2Call:150123:921801"}],"status":1,"nodes":[{"domian":"150122","des":["【 150122 商旅Online火车票预订 】","URL 访问量 5 响应时间 820.0 (ms) ","SessionClient 访问量 9 响应时间 3.1 (ms) ","ESBClient 访问量 17 响应时间 156.4 (ms) ","SOA2Client 访问量 7 响应时间 185.9 (ms) "],"weight":"?op=dependencyGraph&minute=24&domain=150122&date=2015091810","status":1,"link":"?op=dependencyGraph&minute=24&domain=150122&date=2015091810","type":"project"},{"domian":"200402","des":["【 200402 高铁产品服务 】","Memcached 访问量 47 响应时间 105.8 (ms) ","SOA2Client 访问量 2 响应时间 21.5 (ms) "],"weight":"?op=dependencyGraph&minute=24&domain=200402&date=2015091810","status":1,"link":"?op=dependencyGraph&minute=24&domain=200402&date=2015091810","type":"project"},{"domian":"150226","des":["【 150226 授权平台服务2 】","SOA2Client 访问量 7 响应时间 217.3 (ms) ","ESBClient 访问量 1 响应时间 11.0 (ms) ","URL 访问量 4 响应时间 14.2 (ms) "],"weight":"?op=dependencyGraph&minute=24&domain=150226&date=2015091810","status":1,"link":"?op=dependencyGraph&minute=24&domain=150226&date=2015091810","type":"project"},{"domian":"200503","des":["【 200503 火车票订单中转系统 】","Exception 错误数 12 ","SOA2Client 访问量 5 响应时间 6.8 (ms) ","URL 访问量 12 响应时间 2638.6 (ms) ","SQL 访问量 4 响应时间 34.5 (ms) "],"weight":"?op=dependencyGraph&minute=24&domain=200503&date=2015091810","status":1,"link":"?op=dependencyGraph&minute=24&domain=200503&date=2015091810","type":"project"},{"domian":"150219","des":["【 150219 商旅火车票订单服务 】","URL 访问量 4 响应时间 79.0 (ms) ","SOA2Client 访问量 7 响应时间 6611.7 (ms) ","ESBClient 访问量 4 响应时间 6275.0 (ms) "],"weight":"?op=dependencyGraph&minute=24&domain=150219&date=2015091810","status":1,"link":"?op=dependencyGraph&minute=24&domain=150219&date=2015091810","type":"project"},{"domian":"921801","des":["【 921801 SOA2.0服务注册表 】","URL 访问量 244 响应时间 11.0 (ms) "],"weight":"?op=dependencyGraph&minute=24&domain=921801&date=2015091810","status":1,"link":"?op=dependencyGraph&minute=24&domain=921801&date=2015091810","type":"project"}],"domain":"150123","type":"project"}
module.exports=actualdata;