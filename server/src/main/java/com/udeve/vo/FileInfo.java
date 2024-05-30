package com.udeve.vo;

import lombok.Data;

@Data
public class FileInfo {

    public String url;

    public String filename;

    public String contentType;

    public String originalFilename;

    public long size;
}
