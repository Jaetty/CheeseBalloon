package org.greenpine.cheeseballoon.global.encrypt;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
public class AESUtil {

    private static final String AES_ALGORITHM = "AES";
    private static final String AES_CIPHER_ALGORITHM = "AES/ECB/PKCS5Padding"; // ECB 모드 사용

    // AES 키 (16바이트)
    private static final byte[] AES_KEY = "abcdefghijklmnop".getBytes(); // 임의의 16바이트 키, 실제로는 보안에 맞게 관리해야 함

    // AES 암호화
    public static String encrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance(AES_CIPHER_ALGORITHM);
        SecretKeySpec secretKey = new SecretKeySpec(AES_KEY, AES_ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    // AES 복호화
    public static String decrypt(String encryptedData) throws Exception {
        Cipher cipher = Cipher.getInstance(AES_CIPHER_ALGORITHM);
        SecretKeySpec secretKey = new SecretKeySpec(AES_KEY, AES_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decryptedData = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
        return new String(decryptedData);
    }
}