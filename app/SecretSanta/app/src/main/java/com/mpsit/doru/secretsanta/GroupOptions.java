package com.mpsit.doru.secretsanta;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

public class GroupOptions extends AppCompatActivity {
    private String userName, passHash;
    TextView userInfo;
    WebService webService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_group_options);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        webService = new WebService(Utils.URL_WEB_SERVICE_MPSIT);
        userInfo = ((TextView)findViewById(R.id.user_info));

        // we'll use the pass hash in all the web service calls
        Intent intent = getIntent();
        passHash = (String)intent.getSerializableExtra("passHash");
        userName = (String)intent.getSerializableExtra("username");

        new AsyncUserProfile().execute();
    }

    /** Called when the user clicks the Create Group button */
    public void gotoCreateGroup(View view) {
        Intent intent = new Intent(this, CreateGroup.class);
        intent.putExtra("passHash", passHash);
        intent.putExtra("username", userName);
        startActivity(intent);
    }

    private class AsyncUserProfile extends AsyncTask<String, Void, Void> {
        private String rawServerResponse;
        private String query_parameters = "";

        protected Void doInBackground(String... loginCredentials) {

            String[] postQueryNames = new String[] {"username", "hash"};
            String[] postQueryValues = new String[] { userName, passHash};
            try {
                rawServerResponse = webService.postQuery(Utils.PROFILE_PATH_MPSIT, postQueryNames, postQueryValues, 1);
            } catch (CustomException e) {
                System.out.println(e.getExceptionMessage());
            }

            return null;
        }

        protected void onPostExecute(Void unused) {
            JSONObject jsonServerResponse;

            // coudn't get an answer from the web service
            if (rawServerResponse == null)
                userInfo.setText("Unknown User");
            try {
                // check the status of the login
                jsonServerResponse = new JSONObject(rawServerResponse);
                Boolean loginSuccess = jsonServerResponse.getBoolean("success");
                if (!loginSuccess) {
                    JSONObject errorJson = jsonServerResponse.getJSONObject("error");
                    String errorText = errorJson.getString("text");
                    userInfo.setText("Unknown User");
                }
                else {
                    jsonServerResponse = jsonServerResponse.getJSONObject("user");
                    String firstName = jsonServerResponse.getString("firstname");
                    String lastName = jsonServerResponse.getString("lastname");
                    userInfo.setText("Hello, " + firstName + " " + lastName);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

}
