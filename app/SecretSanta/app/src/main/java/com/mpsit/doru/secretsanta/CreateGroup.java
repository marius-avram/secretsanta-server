package com.mpsit.doru.secretsanta;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

public class CreateGroup extends AppCompatActivity {
    private String userName, passHash;
    TextView groupCreationStatus;
    WebService webService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_group);
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
        groupCreationStatus = ((TextView)findViewById(R.id.group_add_status));

        // we'll use the pass hash in all the web service calls
        Intent intent = getIntent();
        passHash = (String)intent.getSerializableExtra("passHash");
        userName = (String)intent.getSerializableExtra("username");
    }

    public void createGroup(View view) {
        String groupName;
        String groupLimit;

        Editable groupNameRaw = ((EditText)findViewById(R.id.group_name)).getText();
        Editable groupLimitRaw = ((EditText)findViewById(R.id.member_limit)).getText();

        if (groupNameRaw == null) {
            // TODO: error message
            return;
        }
        if (groupLimitRaw == null) {
            // TODO: error message
            return;
        }

        groupName = groupNameRaw.toString();
        groupLimit = groupLimitRaw.toString();

        new AsyncCreateGroup().execute(groupName, groupLimit);
    }

    private class AsyncCreateGroup extends AsyncTask<String, Void, Void> {
        private String rawServerResponse;
        private String query_parameters = "";

        protected Void doInBackground(String... groupProperties) {

            String[] postQueryNames = new String[] {"username", "hash", "name", "memberLimit"};
            String[] postQueryValues = new String[] { userName, passHash, groupProperties[0], groupProperties[1]};
            try {
                rawServerResponse = webService.postQuery(Utils.GROUP_CREATE_PATH_MPSIT, postQueryNames, postQueryValues, 0);
            } catch (CustomException e) {
                System.out.println(e.getExceptionMessage());
            }

            return null;
        }

        protected void onPostExecute(Void unused) {
            JSONObject jsonServerResponse;

            // coudn't get an answer from the web service
            if (rawServerResponse == null)
                groupCreationStatus.setText("Can't connect server!");
            try {
                // check the status of the login
                jsonServerResponse = new JSONObject(rawServerResponse);
                Boolean loginSuccess = jsonServerResponse.getBoolean("success");
                if (!loginSuccess) {
                    JSONObject errorJson = jsonServerResponse.getJSONObject("error");
                    String errorText = errorJson.getString("text");
                    groupCreationStatus.setText("Error adding group!");
                }
                else {
                    groupCreationStatus.setText("Group created");
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
