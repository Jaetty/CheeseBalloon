package org.greenpine.cheeseballoon.global.minio;

import io.minio.*;
import lombok.RequiredArgsConstructor;
import org.greenpine.cheeseballoon.global.exception.NotFindException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MinioManager {
    @Value("${minio.url}")
    private String minioUrl;

    private final MinioClient minioClient;

    public String uploadFile(MultipartFile file, String bucketName) throws Exception {
        boolean isBucketExist = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        if (!isBucketExist) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }

        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID() + "_" + originalFilename;

        PutObjectArgs putObjectArgs = PutObjectArgs.builder()
                .bucket(bucketName)
                .object(uniqueFilename)
                .stream(file.getInputStream(), file.getSize(), -1)
                .contentType(file.getContentType())
                .build();

        minioClient.putObject(putObjectArgs);

        return minioUrl+"/"+bucketName+"/"+uniqueFilename;
    }

    public void deleteFile(String imgUrl) throws Exception {
        String[] imgUrlList = imgUrl.split("/");
        String bucketName = imgUrlList[imgUrlList.length-2];
        String objectName = imgUrlList[imgUrlList.length-1];

        try{
            minioClient.statObject( //존재하는지 확인
                    StatObjectArgs.builder().bucket(bucketName).object(objectName).build());
        }catch ( Exception e ){
            throw new NotFindException();
        }

        RemoveObjectArgs removeObjectArgs = RemoveObjectArgs.builder()
                .bucket(bucketName)
                .object(objectName)
                .build();

        minioClient.removeObject(removeObjectArgs);
    }
}
