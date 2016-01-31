package com.mpsit.doru.secretsanta;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {
    WebService webService;
    TextView loginProgressView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        webService = new WebService(Utils.URL_WEB_SERVICE_MPSIT);
        loginProgressView = ((TextView)findViewById(R.id.login_progress_textview));
    }

    /** Called when the user clicks the Login button */
    public void login(View view) {
        String username;
        String password;

        Editable usernameRaw= ((EditText)findViewById(R.id.username_edittext)).getText();
        Editable passwordRaw = ((EditText)findViewById(R.id.password_edittext)).getText();
        if (usernameRaw == null) {
            // TODO: error message
            return;
        }
        if (passwordRaw == null) {
            // TODO: error message
            return;
        }

        username = usernameRaw.toString();
        password = passwordRaw.toString();
        Intent groupOptionsIntent = new Intent(this, GroupOptions.class);
        new AsyncLogin(groupOptionsIntent).execute(username, password);
    }

    /** Called when the user clicks the Sign-Up button */
    public void signUp(View view) {
        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
    }

    private class AsyncLogin extends AsyncTask<String, Void, Void> {
        private Intent groupOptionsIntent;

        public AsyncLogin(Intent intent) {
            this.groupOptionsIntent = intent;
        }

        private String rawServerResponse;
        private String query_parameters = "";

        protected void onPreExecute() {
            loginProgressView.setText("Login in Progress...");
        }

        protected Void doInBackground(String... loginCredentials) {
            String username = loginCredentials[0];
            String password = loginCredentials[1];

            String[] postQueryNames = new String[] {"username", "password"};
            String[] postQueryValues = new String[] { username, password};
            try {
                rawServerResponse = webService.postQuery(Utils.LOGIN_PATH_MPSIT, postQueryNames, postQueryValues, 0);
            } catch (CustomException e) {
                System.out.println(e.getExceptionMessage());
            }

            return null;
        }

        protected void onPostExecute(Void unused) {
                JSONObject jsonServerResponse;

                // coudn't get an answer from the web service
                if (rawServerResponse == null)
                    loginProgressView.setText("Web Service Login Exception!");
                try {
                    // check the status of the login
                    jsonServerResponse = new JSONObject(rawServerResponse);
                    Boolean loginSuccess = jsonServerResponse.getBoolean("success");
                    if (!loginSuccess) {
                        JSONObject errorJson = jsonServerResponse.getJSONObject("error");
                        String errorText = errorJson.getString("text");
                        loginProgressView.setText(errorText);
                    }
                    else {
                        jsonServerResponse = jsonServerResponse.getJSONObject("user");
                        String hash = jsonServerResponse.getString("hash");
                        String userName = jsonServerResponse.getString("username");
                        loginProgressView.setText("Successful login");
                        groupOptionsIntent.putExtra("passHash", hash);
                        groupOptionsIntent.putExtra("username", userName);
                        startActivity(groupOptionsIntent);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
        }
    }
}
