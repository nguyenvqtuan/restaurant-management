package com.restaurantservice.RestaurantApi.service;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.UUID;

@Service
public class FirebaseImageService {

    private final String BUCKET_NAME = "first-project-7cc4e.appspot.com";

    public String upload(MultipartFile multipartFile) {
        try {
            String fileName = multipartFile.getOriginalFilename(); // to get original file name
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName)); // to generated random string values for file name.

            File file = this.convertToFile(multipartFile, fileName); // to convert multipartFile to File
            String URL = this.uploadFile(file, fileName); // to get uploaded file link
            file.delete();
            return URL;
        } catch (Exception e) {
            e.printStackTrace();
            return "Image couldn't upload, Something went wrong";
        }
    }

    public void delete(String fileName) {
        try {
            BlobId blodId = BlobId.of(BUCKET_NAME, fileName);
            Storage storage = getStorage();

            storage.delete(blodId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String uploadFile(File file, String fileName) throws IOException {
        BlobId blobId = BlobId.of(BUCKET_NAME, fileName); // Replace with your bucker name
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();

        Storage storage = getStorage();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));

        String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/" + BUCKET_NAME + "/o/%s?alt=media";
        return URLEncoder.encode(fileName, StandardCharsets.UTF_8);
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    private Storage getStorage() throws IOException {
        InputStream inputStream = FirebaseImageService.class.getClassLoader().getResourceAsStream("firebase-sdk.json"); // change the file name with your one
        Credentials credentials = GoogleCredentials.fromStream(inputStream);
        return StorageOptions.newBuilder().setCredentials(credentials).build().getService();
    }
}
