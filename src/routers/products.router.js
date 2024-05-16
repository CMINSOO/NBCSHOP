import express from "express";
import Shop from "../schemas/product.schema.js";

const router = express.Router();

// 상품등록 API
router.post("/products", async (req, res, next) => {
  // 1. 클라이언트로 부터 받아온 아이템 정보 들을 가져오기
  const { item, iteminfo, seller, password } = req.body;
  let doneAt = new Date();
  let updatedAt = new Date();

  //   1.5 만약 클라이언트가 데이터를 다 전달하지 않으면 에러메세지 출력하기
  if (!item || !iteminfo || !seller || !password) {
    return res.status(400).json({ errorMessage: "정보가 충분하지 않습니다." });
  }

  // 2. item order 숫자 정해주기
  const postedProduct = await Shop.findOne().sort("-order").exec();
  const order = postedProduct ? postedProduct.order + 1 : 1;
  // 4. 상품상태
  const status = "on_Sale";
  // 3. 상품등록
  const product = new Shop({
    item,
    iteminfo,
    seller,
    password,
    order,
    doneAt,
    updatedAt,
    status,
  });

  await product.save();

  //   5. 등록과 함께 등록시간 적용하기

  return res.status(201).json({ product });
});

// 상품 목록 조회 api
router.get("/products", async (req, res, next) => {
  // 1. 상품 목록 조회 를 진행
  const products = await Shop.find({}, { password: 0 }).sort("-doneAt").exec();

  // 2. 상품 목록 조회 결과를 클라이언트에게 반환 하기
  return res.status(200).json({ products });
});

// 상품 상세 조회 API
router.get("/products/:productsId", async (req, res, next) => {
  //get 으로 바꿔야함 get 이 조회하는역활
  const { productsId } = req.params;

  // 먼저 상품의 정보를 나타내야함
  const product = await Shop.findById(productsId, { password: 0 }).exec();

  return res.status(200).json({
    status: 200,
    message: "상품 상세 조회에 성공하였습니다!.",
    data: product,
  });
  //   나중에 상품 상태, 생성 일시, 수정일시 만 추가하면 끝!
});

// 상품 정보 수정 APi
router.patch("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { item, iteminfo, status, seller, password } = req.body;

  const product = await Shop.findById(productId).exec();
  if (!product) {
    return res.status(404).json({ message: "존재하지 않는 상품입니다" });
  }
  if (product.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });
  }

  product.item = item;
  product.iteminfo = iteminfo;
  product.status = status;
  product.seller = seller;
  product.updatedAt = new Date();

  await product.save();

  return res
    .status(200)
    .json({ message: "수정이 완료 되었습니다.", data: product });
});

// 상품 삭제 API
router.delete("/products/:productId", async (req, res, next) => {
  const { productId } = req.params;

  const product = await Shop.findById(productId).exec();
  if (!product) {
    return res.status(404).json({ message: "존재하지 않는 상품입니다" });
  }

  await Shop.deleteOne({ _id: productId });

  return res.status(200).json({});
});

export default router;

// router.post(
//   "/products",
//   asyncHandler(async (req, res, next) => {
//     // 먼저 아이템,아이템정보, 판매자, 비밀번호 를 바디에 넣어주기
//     const { item, iteminfo, seller, password } = req.body;
//     //  만약 4 요소중에 하나라도 true 라면 정확하지 않은 정보 메세지 출력
//     if (!item || !iteminfo || !seller || !password) {
//       return res.status(400).json({ errorMessage: "정확하지 않은 정보입니다" });
//     }
//     await Shop.create({ item, iteminfo, seller, password });
//     res.json({ message: "판매 상품을 정상등록 하였습니다!" });
//   })
// );
