import { hash } from "bcryptjs";

async function generateHashedPassword() {
  const password = "123456"; // هنا اكتب كلمة المرور التي تريد تشفيرها
  const hashedPassword = await hash(password, 12);

  console.log("الهاش الناتج: ", hashedPassword);
}

generateHashedPassword();
