--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-01-21 21:56:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16408)
-- Name: bike_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bike_categories (
    category_id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.bike_categories OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16407)
-- Name: bike_categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bike_categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bike_categories_category_id_seq OWNER TO postgres;

--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 218
-- Name: bike_categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bike_categories_category_id_seq OWNED BY public.bike_categories.category_id;


--
-- TOC entry 221 (class 1259 OID 16415)
-- Name: bike_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bike_models (
    model_id integer NOT NULL,
    name character varying(255) NOT NULL,
    category_id integer,
    description text,
    wheel_size integer,
    manufacturer character varying(255),
    brake_type character varying(255)
);


ALTER TABLE public.bike_models OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16414)
-- Name: bike_models_model_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bike_models_model_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bike_models_model_id_seq OWNER TO postgres;

--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 220
-- Name: bike_models_model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bike_models_model_id_seq OWNED BY public.bike_models.model_id;


--
-- TOC entry 217 (class 1259 OID 16399)
-- Name: bike_stations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bike_stations (
    station_id integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    latitude numeric(9,6),
    longitude numeric(9,6)
);


ALTER TABLE public.bike_stations OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16398)
-- Name: bike_stations_station_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bike_stations_station_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bike_stations_station_id_seq OWNER TO postgres;

--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 216
-- Name: bike_stations_station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bike_stations_station_id_seq OWNED BY public.bike_stations.station_id;


--
-- TOC entry 223 (class 1259 OID 16429)
-- Name: individual_bikes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.individual_bikes (
    bike_id integer NOT NULL,
    model_id integer,
    unique_id character varying(255)
);


ALTER TABLE public.individual_bikes OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16428)
-- Name: individual_bikes_bike_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.individual_bikes_bike_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.individual_bikes_bike_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 222
-- Name: individual_bikes_bike_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.individual_bikes_bike_id_seq OWNED BY public.individual_bikes.bike_id;


--
-- TOC entry 225 (class 1259 OID 16443)
-- Name: parking_places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_places (
    place_id integer NOT NULL,
    station_id integer,
    number integer NOT NULL,
    category_id integer
);


ALTER TABLE public.parking_places OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16442)
-- Name: parking_places_place_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_places_place_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parking_places_place_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 224
-- Name: parking_places_place_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_places_place_id_seq OWNED BY public.parking_places.place_id;


--
-- TOC entry 231 (class 1259 OID 16491)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    user_id integer,
    model_id integer,
    station_id integer,
    rating integer,
    comment text
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16490)
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_review_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 230
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- TOC entry 227 (class 1259 OID 16462)
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    ticket_id integer NOT NULL,
    user_id integer,
    model_id integer,
    category_id integer,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    price numeric(8,2),
    status character varying(20),
    CONSTRAINT valid_times CHECK ((end_time > start_time))
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16461)
-- Name: tickets_ticket_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_ticket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tickets_ticket_id_seq OWNER TO postgres;

--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 226
-- Name: tickets_ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_ticket_id_seq OWNED BY public.tickets.ticket_id;


--
-- TOC entry 229 (class 1259 OID 16480)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    wallet numeric(8,2)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16479)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 228
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4726 (class 2604 OID 16411)
-- Name: bike_categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_categories ALTER COLUMN category_id SET DEFAULT nextval('public.bike_categories_category_id_seq'::regclass);


--
-- TOC entry 4727 (class 2604 OID 16418)
-- Name: bike_models model_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_models ALTER COLUMN model_id SET DEFAULT nextval('public.bike_models_model_id_seq'::regclass);


--
-- TOC entry 4725 (class 2604 OID 16402)
-- Name: bike_stations station_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_stations ALTER COLUMN station_id SET DEFAULT nextval('public.bike_stations_station_id_seq'::regclass);


--
-- TOC entry 4728 (class 2604 OID 16432)
-- Name: individual_bikes bike_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes ALTER COLUMN bike_id SET DEFAULT nextval('public.individual_bikes_bike_id_seq'::regclass);


--
-- TOC entry 4729 (class 2604 OID 16446)
-- Name: parking_places place_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places ALTER COLUMN place_id SET DEFAULT nextval('public.parking_places_place_id_seq'::regclass);


--
-- TOC entry 4732 (class 2604 OID 16494)
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- TOC entry 4730 (class 2604 OID 16465)
-- Name: tickets ticket_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN ticket_id SET DEFAULT nextval('public.tickets_ticket_id_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 16483)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4910 (class 0 OID 16408)
-- Dependencies: 219
-- Data for Name: bike_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bike_categories (category_id, name) FROM stdin;
9	Mountain Bikes
10	Electric Bikes
11	Children Bikes
12	City Bikes
\.


--
-- TOC entry 4912 (class 0 OID 16415)
-- Dependencies: 221
-- Data for Name: bike_models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bike_models (model_id, name, category_id, description, wheel_size, manufacturer, brake_type) FROM stdin;
21	Model 1	9	Mountain Bike Model 1	26	Brand A	Disc
22	Model 2	10	Electric Bike Model 1	28	Brand B	Drum
\.


--
-- TOC entry 4908 (class 0 OID 16399)
-- Dependencies: 217
-- Data for Name: bike_stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bike_stations (station_id, name, address, latitude, longitude) FROM stdin;
11	Station 1	Address 1	46.372700	14.181700
12	Station 2	Address 2	46.371000	14.262400
\.


--
-- TOC entry 4914 (class 0 OID 16429)
-- Dependencies: 223
-- Data for Name: individual_bikes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.individual_bikes (bike_id, model_id, unique_id) FROM stdin;
\.


--
-- TOC entry 4916 (class 0 OID 16443)
-- Dependencies: 225
-- Data for Name: parking_places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking_places (place_id, station_id, number, category_id) FROM stdin;
17	11	1	9
18	11	2	10
19	12	1	11
20	12	2	12
\.


--
-- TOC entry 4922 (class 0 OID 16491)
-- Dependencies: 231
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (review_id, user_id, model_id, station_id, rating, comment) FROM stdin;
\.


--
-- TOC entry 4918 (class 0 OID 16462)
-- Dependencies: 227
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (ticket_id, user_id, model_id, category_id, start_time, end_time, price, status) FROM stdin;
\.


--
-- TOC entry 4920 (class 0 OID 16480)
-- Dependencies: 229
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, email, password, wallet) FROM stdin;
1	user1@example.com	password1	0.00
2	user2@example.com	password2	100.00
\.


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 218
-- Name: bike_categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bike_categories_category_id_seq', 12, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 220
-- Name: bike_models_model_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bike_models_model_id_seq', 22, true);


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 216
-- Name: bike_stations_station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bike_stations_station_id_seq', 12, true);


--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 222
-- Name: individual_bikes_bike_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.individual_bikes_bike_id_seq', 3, true);


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 224
-- Name: parking_places_place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_places_place_id_seq', 20, true);


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 230
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 1, false);


--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 226
-- Name: tickets_ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_ticket_id_seq', 1, false);


--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 228
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- TOC entry 4737 (class 2606 OID 16413)
-- Name: bike_categories bike_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_categories
    ADD CONSTRAINT bike_categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4739 (class 2606 OID 16422)
-- Name: bike_models bike_models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_models
    ADD CONSTRAINT bike_models_pkey PRIMARY KEY (model_id);


--
-- TOC entry 4735 (class 2606 OID 16406)
-- Name: bike_stations bike_stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_stations
    ADD CONSTRAINT bike_stations_pkey PRIMARY KEY (station_id);


--
-- TOC entry 4741 (class 2606 OID 16434)
-- Name: individual_bikes individual_bikes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes
    ADD CONSTRAINT individual_bikes_pkey PRIMARY KEY (bike_id);


--
-- TOC entry 4743 (class 2606 OID 16436)
-- Name: individual_bikes individual_bikes_unique_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes
    ADD CONSTRAINT individual_bikes_unique_id_key UNIQUE (unique_id);


--
-- TOC entry 4745 (class 2606 OID 16448)
-- Name: parking_places parking_places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT parking_places_pkey PRIMARY KEY (place_id);


--
-- TOC entry 4755 (class 2606 OID 16498)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- TOC entry 4749 (class 2606 OID 16468)
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (ticket_id);


--
-- TOC entry 4747 (class 2606 OID 16450)
-- Name: parking_places unique_parking_place; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT unique_parking_place UNIQUE (station_id, number);


--
-- TOC entry 4751 (class 2606 OID 16489)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4753 (class 2606 OID 16487)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4756 (class 2606 OID 16423)
-- Name: bike_models bike_models_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_models
    ADD CONSTRAINT bike_models_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.bike_categories(category_id);


--
-- TOC entry 4757 (class 2606 OID 16437)
-- Name: individual_bikes individual_bikes_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes
    ADD CONSTRAINT individual_bikes_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.bike_models(model_id);


--
-- TOC entry 4758 (class 2606 OID 16456)
-- Name: parking_places parking_places_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT parking_places_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.bike_categories(category_id);


--
-- TOC entry 4759 (class 2606 OID 16451)
-- Name: parking_places parking_places_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT parking_places_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.bike_stations(station_id);


--
-- TOC entry 4762 (class 2606 OID 16499)
-- Name: reviews reviews_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.bike_models(model_id);


--
-- TOC entry 4763 (class 2606 OID 16504)
-- Name: reviews reviews_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.bike_stations(station_id);


--
-- TOC entry 4760 (class 2606 OID 16474)
-- Name: tickets tickets_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.bike_categories(category_id);


--
-- TOC entry 4761 (class 2606 OID 16469)
-- Name: tickets tickets_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.bike_models(model_id);


-- Completed on 2024-01-21 21:56:29

--
-- PostgreSQL database dump complete
--

