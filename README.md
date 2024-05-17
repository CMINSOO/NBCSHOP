API 명세서
|METHOD|API URL|기능|request|
|------|---|---|---|
|GET|/api/products|전체 품목 조회||
|POST|api/products/|상품 등록|{"product": {"item": "너 왜 시간 조정이 안돼니?","iteminfo": "시간이 안바뀌니 얘","seller": "질리언","password": 1003,"status": "on_Sale","order": 33,"doneAt": "2024-05-16T03:54:36.771Z","updatedAt": "2024-05-16T03:54:36.771Z","_id": "6645837c95aa7febc1efa6b0","__v": 0}}|
|GET|/api/products/:productsId|상품상세 조회|{}|
|PATCH|/api/products/:productsId|상품상세내용 수정|{"item" : "코코볼","iteminfo" : "달달해요","status" : "Out_of_Sale","seller": "조민수","password": 1003}|
|DEL|/api/proucts/:productsId|상품삭제||
