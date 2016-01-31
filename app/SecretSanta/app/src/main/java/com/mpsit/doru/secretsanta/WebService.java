package com.mpsit.doru.secretsanta;

import android.net.Uri;
import android.net.Uri.Builder;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Doru on 31.01.2016.
 */
public class WebService {
    private String rootUrl;

    public WebService(String rootUrl) {
        this.rootUrl = rootUrl;
    }

    public String postQuery(String path, String[] names, String[] values, int requestMethod) throws CustomException {
        String queryResult;
        String postParameters = "";
        HttpURLConnection connection = null;
        OutputStreamWriter writer = null;
        BufferedReader reader = null;

        try {
            Uri.Builder uriBuilder;

            switch (requestMethod) {

                case Utils.HTTP_POST:
                    // build URL - in this case the URL doesn't contain the request parameters
                    uriBuilder = Uri.parse(rootUrl).buildUpon();
                    uriBuilder.path(path);
                    URL url = null;
                    url = new URL(uriBuilder.build().toString());

                    // build parameters string as name1=value1&name2=value2..
                    for (int i = 0; i < names.length; i++) {
                        String delimiter = "";
                        if (i > 0)
                            delimiter = Utils.POST_PARAMETER_DELIMITER;
                        postParameters = postParameters.concat(delimiter.concat(names[i]).concat("=").concat(values[i]));
                    }

                    // encapsulate post parameters in the HTTP header
                    byte[] postData = postParameters.getBytes(StandardCharsets.UTF_8);
                    int postDataLength = postData.length;
                    connection = (HttpURLConnection) url.openConnection();
                    connection.setDoOutput(true);
                    connection.setInstanceFollowRedirects(false);
                    connection.setRequestMethod("POST");
                    connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                    connection.setRequestProperty("charset", "utf-8");
                    connection.setRequestProperty("Content-Length", Integer.toString(postDataLength));
                    connection.setUseCaches(false);

                    // send the POST data to the server
                    DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
                    wr.write(postData);

                    //debug
                    System.out.println("URL for the POST query is: " + url.toString());
                    System.out.println("Parameters for the POST query is: " + postParameters);
                    break;

                case Utils.HTTP_GET:
                    // build complete URL - in this case URL does contain the request parameters
                    uriBuilder = Uri.parse(rootUrl).buildUpon();
                    uriBuilder.path(path);
                    for (int i = 0; i < names.length; i++)
                        uriBuilder.appendQueryParameter(names[i], values[i]);
                    url = new URL(uriBuilder.build().toString());
                    connection = (HttpURLConnection) url.openConnection();

                    // debug
                    System.out.println("URL for the GET query is: " + url.toString());
                    break;

                default:
                    break;
            }

            // receive the server response
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null)
                sb.append(line + " ");

            // save query result
            queryResult = sb.toString();

            System.out.println("Query Result: " + queryResult);
            return queryResult;
        } catch (IOException e) {
            e.printStackTrace();
            throw new CustomException("IO Exception while communicating with the server");
        } finally {
            if (writer != null)
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new CustomException("Internal Error");
                }
            if (reader != null)
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new CustomException("Internal Error");
                }
        }
    }
}
