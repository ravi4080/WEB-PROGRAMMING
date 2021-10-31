package com.example.vijaya.myorder;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

public class SummaryActivity extends AppCompatActivity {
    String orderSummary;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_summary);
        setTitle("Order Summary");
        Intent intent  = getIntent();
        orderSummary = intent.getExtras().getString("orderSummary");
        ((TextView) findViewById(R.id.summary_text)).setText(orderSummary);
        Log.d("orderSummary",orderSummary);
    }

    public void sendEmail(View view) {

        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("text/plain");
        intent.putExtra(Intent.EXTRA_EMAIL, new String[]{"orders@thepizzaplace.com"});
        intent.putExtra(Intent.EXTRA_SUBJECT, "Pizza Ordering App's Order");
        intent.putExtra(Intent.EXTRA_TEXT, orderSummary);

        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }
    }

}