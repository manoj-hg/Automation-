from abc import ABC, abstractmethod
from typing import Dict, Any
import os
import requests

class Publisher(ABC):
    @abstractmethod
    def publish(self, post: Dict[str, Any]) -> bool:
        pass

class MockPublisher(Publisher):
    def publish(self, post: Dict[str, Any]) -> bool:
        print(f"[MockPublisher] Publishing post: {post.get('headline')}")
        return True

class WhatsAppPublisher(Publisher):
    def __init__(self):
        self.access_token = os.environ.get("WHATSAPP_ACCESS_TOKEN")
        self.phone_number_id = os.environ.get("WHATSAPP_PHONE_NUMBER_ID")
        self.recipient_id = os.environ.get("WHATSAPP_RECIPIENT_ID") # Channel ID or Group/User ID

    def publish(self, post: Dict[str, Any]) -> bool:
        if not all([self.access_token, self.phone_number_id, self.recipient_id]):
            print("[WhatsAppPublisher] Missing WhatsApp credentials in .env")
            return False

        url = f"https://graph.facebook.com/v19.0/{self.phone_number_id}/messages"
        
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "messaging_product": "whatsapp",
            "to": self.recipient_id,
            "type": "text",
            "text": {
                "body": post.get("content", "New Tech Update!")
            }
        }
        
        try:
            response = requests.post(url, headers=headers, json=payload)
            response.raise_for_status()
            print(f"[WhatsAppPublisher] Successfully published: {post.get('headline')}")
            return True
        except Exception as e:
            print(f"[WhatsAppPublisher] Failed to publish: {e}")
            if hasattr(e, 'response') and e.response:
                print(e.response.text)
            return False

def get_publisher() -> Publisher:
    # Use MockPublisher if Demo Mode is active, otherwise use WhatsApp
    from app.core.config import settings
    if settings.demo_mode:
        return MockPublisher()
    return WhatsAppPublisher()

publisher_service = get_publisher()
