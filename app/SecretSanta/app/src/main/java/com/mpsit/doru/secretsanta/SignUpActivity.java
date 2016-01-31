package com.mpsit.doru.secretsanta;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

public class SignUpActivity extends AppCompatActivity {
    WebService webService;
    TextView registerProgressView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup_activity);

        webService = new WebService(Utils.URL_WEB_SERVICE_MPSIT);
        registerProgressView = ((TextView)findViewById(R.id.register_progress));
    }

    /** Called when the user clicks the Already Registered button */
    public void gotoLogin(View view) {
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }

    /** Called when the user clicks the Register button */
    public void registerUser(View view) {
        String firstName;
        String lastName;
        String userName;
        String email;
        String password;
        String passwordConfirm;

        System.out.println("CLICKED register button\n");

        Editable firstNameRaw = ((EditText)findViewById(R.id.firstname)).getText();
        Editable lastNameRaw = ((EditText)findViewById(R.id.lastname)).getText();
        Editable userNameRaw = ((EditText)findViewById(R.id.username)).getText();
        Editable emailRaw = ((EditText)findViewById(R.id.email)).getText();
        Editable passwordRaw = ((EditText)findViewById(R.id.password)).getText();
        Editable confirmPasswordRaw = ((EditText)findViewById(R.id.confirm_password)).getText();

        if (firstNameRaw == null) {
            // TODO: error message
            return;
        }
        if (lastNameRaw == null) {
            // TODO: error message
            return;
        }
        if (userNameRaw == null) {
            // TODO: error message
            return;
        }
        if (emailRaw == null) {
            // TODO: error message
            return;
        }
        if (passwordRaw == null) {
            // TODO: error message
            return;
        }
        if (confirmPasswordRaw == null) {
            // TODO: error message
            return;
        }

        firstName = firstNameRaw.toString();
        lastName = lastNameRaw.toString();
        userName = userNameRaw.toString();
        email = emailRaw.toString();
        password = passwordRaw.toString();
        passwordConfirm = confirmPasswordRaw.toString();

        if (password.equals(passwordConfirm) == false) {
            // TODO: error message
            return;
        }

        new AsyncRegister().execute(firstName, lastName, userName, email, password);
    }

    private class AsyncRegister extends AsyncTask<String, Void, Void> {
        private String rawServerResponse;
        private String query_parameters = "";

        protected void onPreExecute() {
            registerProgressView.setText("Login in Progress...");
        }

        protected Void doInBackground(String... loginCredentials) {
            String firstName = loginCredentials[0];
            String lastName = loginCredentials[1];
            String userName = loginCredentials[2];
            String email = loginCredentials[3];
            String password = loginCredentials[4];

            String[] postQueryNames = new String[] {"email", "password", "username", "firstname", "lastname"};
            String[] postQueryValues = new String[] {email, password, userName, firstName, lastName};

            try {
                rawServerResponse = webService.postQuery(Utils.REGISTER_PATH_MPSIT, postQueryNames, postQueryValues, 0);
            } catch (CustomException e) {
                System.out.println(e.getExceptionMessage());
            }

            return null;
        }

        protected void onPostExecute(Void unused) {
            String OutputData = "";
            JSONObject jsonServerResponse;

            // coudn't get an answer from the web service
            if (rawServerResponse == null)
                registerProgressView.setText("Web Service Register Exception!");
            try {
                // check the status of the login
                jsonServerResponse = new JSONObject(rawServerResponse);
                Boolean loginSuccess = jsonServerResponse.getBoolean("success");
                if (!loginSuccess) {
                    JSONObject errorJson = jsonServerResponse.getJSONObject("error");
                    String errorText = errorJson.getString("text");
                    registerProgressView.setText(errorText);
                    String errorReason = errorJson.getString("error");
                    registerProgressView.setText(errorText.concat("\n").concat(errorReason));
                }
                else {
                    registerProgressView.setText("User registered successfully");
                    //
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
