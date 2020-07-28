import multiparty from "connect-multiparty";
export const mdUploadImage = multiparty({uploadDir: './uploads/items'})