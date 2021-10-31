package com.example.vijaya.myorder;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private static final String MAIN_ACTIVITY_TAG = "MainActivity";
    final int PIZZA_PRICE = 5;
    final int TOPPING_PRICE = 1;

    int quantity = 2;
    int toppings = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        addCheckBoxListener(R.id.pepperoni_checked);
        addCheckBoxListener(R.id.ham_checked);
        addCheckBoxListener(R.id.onion_checked);
        addCheckBoxListener(R.id.pineapple_checked);
    }

    public void addCheckBoxListener(int id) {
        CheckBox perpperroni = (CheckBox) findViewById(id);
        perpperroni.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(((CheckBox)view).isChecked()) {
                    toppings++;
                }
                else {
                    toppings--;
                }
                ((TextView) findViewById(R.id.toppings)).setText("TOPPINGS: " + toppings);
            }
        });
    }

    /**
     * This method is called when the order button is clicked.
     */

    public void submitOrder(View view) {
        // create and store the order summary
        String orderSummaryMessage = createOrderSummary();
        // Write the relevant code for making the buttons work(i.e implement the implicit and explicit intents
        Intent intent  = new Intent(this, SummaryActivity.class);
        intent.putExtra("orderSummary", orderSummaryMessage);
        startActivity(intent);
    }

    public void sendEmail(View view) {
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("text/plain");
        intent.putExtra(Intent.EXTRA_EMAIL, new String[]{"sxkfrvr@gmail.com"});
        intent.putExtra(Intent.EXTRA_SUBJECT, "Pizza Ordering App's Order");
        intent.putExtra(Intent.EXTRA_TEXT, createOrderSummary());

        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }
        /*Intent intent = new Intent(Intent.ACTION_VIEW);
        if (intent.resolveActivity(getPackageManager()) !=null){
            startActivity(intent);
        }*/
    }

    private String boolToString(boolean bool) {
        return bool ? (getString(R.string.yes)) : (getString(R.string.no));
    }

    private String createOrderSummary() {
        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();

        // check if whipped cream is selected
        CheckBox pepperoni = (CheckBox) findViewById(R.id.pepperoni_checked);
        boolean hasPepperoni = pepperoni.isChecked();

        // check if chocolate is selected
        CheckBox ham = (CheckBox) findViewById(R.id.ham_checked);
        boolean hasHam = ham.isChecked();

        CheckBox pineapple = (CheckBox) findViewById(R.id.pineapple_checked);
        boolean hasPineapple = pineapple.isChecked();

        CheckBox onion = (CheckBox) findViewById(R.id.onion_checked);
        boolean hasOnion = onion.isChecked();

        float price = calculatePrice();

        String orderSummaryMessage = getString(R.string.order_summary_name, userInputName) + "\n" + "\n" +
                "Add Whipped Cream? (Yes)" + "\n" +
                "Add chocolate? (Yes)" + "\n" +
                "Add Whipped Cream? (Yes)" + "\n" +
                "Add chocolate? (Yes)" + "\n" + "\n" +
                "Quantity: (2)" + "\n" +
                "Total: $ (10)" + "\n" + "\n" +
                "Thank you!";
        return orderSummaryMessage;
    }


    /**
     * Method to calculate the total price
     *
     * @return total Price
     */
    private float calculatePrice() {
        return (PIZZA_PRICE + TOPPING_PRICE * toppings) * quantity;
    }

    /**
     * This method displays the given quantity value on the screen.
     */
    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
        ((TextView) findViewById(R.id.quantity)).setText("QUANTITY: " + number);
    }

    /**
     * This method increments the quantity of coffee cups by one
     *
     * @param view on passes the view that we are working with to the method
     */

    public void increment(View view) {
        if (quantity < 100) {
            quantity = quantity++;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select less than one hundred cups of coffee");
            Context context = getApplicationContext();
            String lowerLimitToast = getString(R.string.too_much_coffee);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, lowerLimitToast, duration);
            toast.show();
            return;
        }
    }

    /**
     * This method decrements the quantity of coffee cups by one
     *
     * @param view passes on the view that we are working with to the method
     */
    public void decrement(View view) {
        if (quantity > 1) {
            quantity = quantity - 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select atleast one quantity");
            Context context = getApplicationContext();
            String upperLimitToast = getString(R.string.too_little_coffee);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, upperLimitToast, duration);
            toast.show();
            return;
        }
    }
}