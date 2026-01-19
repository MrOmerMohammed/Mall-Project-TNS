package com.avn.mallproject;

import com.avn.mallproject.entity.Customer;
import com.avn.mallproject.entity.Item;
import com.avn.mallproject.entity.Mall;
import com.avn.mallproject.entity.OrderDetails;
import com.avn.mallproject.entity.Shop;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class MallprojectApplicationTests {

	@Autowired
	private WebApplicationContext webApplicationContext;

	private MockMvc mockMvc;

	private ObjectMapper objectMapper = new ObjectMapper();

	// Static variables to share IDs across ordered tests
	private static Long createdMallId;
	private static Long createdShopId;
	private static Long createdCustomerId;
	private static Long createdItemId;

	@BeforeEach
	public void setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
	}

	@Test
	@Order(1)
	void contextLoads() {
	}

	// --- Mall Tests ---

	@Test
	@Order(2)
	void testCreateMall() throws Exception {
		Mall mall = new Mall();
		mall.setMallName("Galaxy Mall");
		mall.setLocation("City Center");
		mall.setContactNumber("1234567890");

		MvcResult result = mockMvc.perform(post("/api/malls")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(mall)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.mallName", is("Galaxy Mall")))
				.andExpect(jsonPath("$.mallId").exists())
				.andReturn();

		String response = result.getResponse().getContentAsString();
		Mall responseMall = objectMapper.readValue(response, Mall.class);
		createdMallId = responseMall.getMallId();
	}

	@Test
	@Order(3)
	void testGetMall() throws Exception {
		mockMvc.perform(get("/api/malls/" + createdMallId))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.mallName", is("Galaxy Mall")));
	}

	@Test
	@Order(4)
	void testGetAllMalls() throws Exception {
		mockMvc.perform(get("/api/malls"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))));
	}

	// --- Shop Tests ---

	@Test
	@Order(5)
	void testCreateShop() throws Exception {
		Shop shop = new Shop();
		shop.setShopName("Tech Haven");
		shop.setShopType("Electronics");
		shop.setStatus("Open");

		// Link existing mall
		Mall mall = new Mall();
		mall.setMallId(createdMallId);
		shop.setMall(mall);

		MvcResult result = mockMvc.perform(post("/api/shops")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(shop)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.shopName", is("Tech Haven")))
				.andExpect(jsonPath("$.shopId").exists())
				.andReturn();

		String response = result.getResponse().getContentAsString();
		Shop responseShop = objectMapper.readValue(response, Shop.class);
		createdShopId = responseShop.getShopId();
	}

	@Test
	@Order(6)
	void testGetShopsByMall() throws Exception {
		mockMvc.perform(get("/api/shops/mall/" + createdMallId))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].shopName", is("Tech Haven")));
	}

	// --- Customer Tests ---

	@Test
	@Order(7)
	void testCreateCustomer() throws Exception {
		Customer customer = new Customer();
		customer.setCustomerName("John Doe");
		customer.setEmail("john@example.com");
		customer.setPhoneNumber("9876543210");

		MvcResult result = mockMvc.perform(post("/api/customers")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(customer)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.customerName", is("John Doe")))
				.andExpect(jsonPath("$.customerId").exists())
				.andReturn();

		String response = result.getResponse().getContentAsString();
		Customer responseCustomer = objectMapper.readValue(response, Customer.class);
		createdCustomerId = responseCustomer.getCustomerId();
	}

	// --- Item Tests ---

	@Test
	@Order(8)
	void testCreateItem() throws Exception {
		Item item = new Item();
		item.setItemName("Laptop");
		item.setPrice(1200.00);
		item.setQuantity(10);

		// Items are added via ItemController /api/items/shop/{shopId}
		MvcResult result = mockMvc.perform(post("/api/items/shop/" + createdShopId)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(item)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.itemName", is("Laptop")))
				.andExpect(jsonPath("$.itemId").exists())
				.andReturn();

		String response = result.getResponse().getContentAsString();
		Item responseItem = objectMapper.readValue(response, Item.class);
		createdItemId = responseItem.getItemId();
	}

	// --- Order Tests ---

	@Test
	@Order(9)
	void testCreateOrder() throws Exception {
		OrderDetails order = new OrderDetails();
		order.setOrderStatus("PENDING");
		order.setPaymentMode("CREDIT_CARD");
		order.setTotalAmount(1200.00);

		Customer customer = new Customer();
		customer.setCustomerId(createdCustomerId);
		order.setCustomer(customer);

		Shop shop = new Shop();
		shop.setShopId(createdShopId);
		order.setShop(shop);

		MvcResult result = mockMvc.perform(post("/api/orders")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(order)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.orderStatus", is("PENDING")))
				.andExpect(jsonPath("$.orderId").exists())
				.andReturn();
	}
}
