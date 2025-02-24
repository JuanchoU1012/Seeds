from models.sellerandcommerce import sellerandcommerce

class SellerAndCommerceController:
    def create_seller_and_commerce(data):
        return sellerandcommerce.create_seller_and_commerce(data)

    def get_sellers_and_commerces():
        return sellerandcommerce.get_sellers_and_commerces()

    def get_seller_and_commerce(IdComercio):
        return sellerandcommerce.get_seller_and_commerce(IdComercio)

    def update_seller_and_commerce(IdComercio, data):
        return sellerandcommerce.update_seller_and_commerce(IdComercio, data)

    def delete_seller_and_commerce(IdComercio):
        return sellerandcommerce.delete_seller_and_commerce(IdComercio)
    
# address
    def get_cities():
        return sellerandcommerce.get_cities()
    def get_departments():
        return sellerandcommerce.get_departments()