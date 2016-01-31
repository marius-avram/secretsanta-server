package com.mpsit.doru.secretsanta;

/**
 * Created by doru on 31.01.2016.
 */
public class CustomException extends Exception {
    private String exceptionMessage;

    public CustomException(String message) {

    }

    public String getExceptionMessage() {
        return exceptionMessage;
    }

    public void setExceptionMessage(String exceptionMessage) {
        this.exceptionMessage = exceptionMessage;
    }
}
