import { openBrowserAsync } from "expo-web-browser";
import { AccessToken } from "@/config.json";
import { purchaseTicket } from "@/api/event";

export const handleIntegrationMP = async (ticketSelect: any, purchase: any) => {

    const price = ticketSelect.unit_price
    const quantity = ticketSelect.quantity

    const preferences = {
        "items": [
            {
                "id": `${ticketSelect.id}`,
                "title": `${ticketSelect.title}`,
                "description": `${ticketSelect.description}`,
                "picture_url": `${ticketSelect.picture_url}`,
                "category_id": `Musica`,
                "quantity": quantity,
                "currency_id": "MXN",
                "unit_price": price
            }
        ],
        "back_urls": {
            "success": "yourapp://payment-success",
            "failure": "yourapp://payment-failure",
            "pending": "yourapp://payment-pending"
        },
        "auto_return": "approved"
    };

    try {
        const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AccessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preferences)
        });

        const data = await res.json();
        console.log('data', data);

        if (data.init_point) {
            await openBrowserAsync(data.init_point);

            try {
                const res = await purchaseTicket(purchase)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }

        } else {
            console.log('Failed to get init_point');
        }

    } catch (error) {
        console.log(error);
    }
};
