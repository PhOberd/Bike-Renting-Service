--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-02-14 11:55:54

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
-- TOC entry 6 (class 2615 OID 16583)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16584)
-- Name: bike_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bike_categories (
    category_id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.bike_categories OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16587)
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
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 217
-- Name: bike_categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bike_categories_category_id_seq OWNED BY public.bike_categories.category_id;


--
-- TOC entry 218 (class 1259 OID 16588)
-- Name: bike_models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bike_models (
    model_id integer NOT NULL,
    name character varying(255) NOT NULL,
    category_id integer,
    description text,
    wheel_size integer,
    manufacturer character varying(255),
    brake_type character varying(255),
    price numeric(6,2)
);


ALTER TABLE public.bike_models OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16593)
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
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 219
-- Name: bike_models_model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bike_models_model_id_seq OWNED BY public.bike_models.model_id;


--
-- TOC entry 220 (class 1259 OID 16594)
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
-- TOC entry 221 (class 1259 OID 16599)
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
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 221
-- Name: bike_stations_station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bike_stations_station_id_seq OWNED BY public.bike_stations.station_id;


--
-- TOC entry 222 (class 1259 OID 16600)
-- Name: individual_bikes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.individual_bikes (
    bike_id integer NOT NULL,
    model_id integer,
    unique_id character varying(255),
    station_id integer,
    status character varying(10) DEFAULT 'Free'::character varying,
    CONSTRAINT individual_bikes_status_check CHECK (((status)::text = ANY (ARRAY[('Free'::character varying)::text, ('InUse'::character varying)::text])))
);


ALTER TABLE public.individual_bikes OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16605)
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
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 223
-- Name: individual_bikes_bike_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.individual_bikes_bike_id_seq OWNED BY public.individual_bikes.bike_id;


--
-- TOC entry 224 (class 1259 OID 16606)
-- Name: parking_places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_places (
    place_id integer NOT NULL,
    station_id integer,
    number integer NOT NULL,
    category_id integer,
    bike_id integer
);


ALTER TABLE public.parking_places OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16609)
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
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 225
-- Name: parking_places_place_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_places_place_id_seq OWNED BY public.parking_places.place_id;


--
-- TOC entry 226 (class 1259 OID 16610)
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
-- TOC entry 227 (class 1259 OID 16615)
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
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 227
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- TOC entry 228 (class 1259 OID 16616)
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
    station_id integer,
    bike_id integer,
    CONSTRAINT valid_times CHECK ((end_time > start_time))
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16620)
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
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 229
-- Name: tickets_ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_ticket_id_seq OWNED BY public.tickets.ticket_id;


--
-- TOC entry 230 (class 1259 OID 16621)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    wallet numeric(8,2),
    isadmin boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16627)
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
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 231
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4725 (class 2604 OID 16628)
-- Name: bike_categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_categories ALTER COLUMN category_id SET DEFAULT nextval('public.bike_categories_category_id_seq'::regclass);


--
-- TOC entry 4726 (class 2604 OID 16629)
-- Name: bike_models model_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_models ALTER COLUMN model_id SET DEFAULT nextval('public.bike_models_model_id_seq'::regclass);


--
-- TOC entry 4727 (class 2604 OID 16630)
-- Name: bike_stations station_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_stations ALTER COLUMN station_id SET DEFAULT nextval('public.bike_stations_station_id_seq'::regclass);


--
-- TOC entry 4728 (class 2604 OID 16631)
-- Name: individual_bikes bike_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes ALTER COLUMN bike_id SET DEFAULT nextval('public.individual_bikes_bike_id_seq'::regclass);


--
-- TOC entry 4730 (class 2604 OID 16632)
-- Name: parking_places place_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places ALTER COLUMN place_id SET DEFAULT nextval('public.parking_places_place_id_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 16633)
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- TOC entry 4732 (class 2604 OID 16634)
-- Name: tickets ticket_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN ticket_id SET DEFAULT nextval('public.tickets_ticket_id_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 16635)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4915 (class 0 OID 16584)
-- Dependencies: 216
-- Data for Name: bike_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bike_categories (category_id, name) FROM stdin;
11	Children Bikes
12	City Bikes
14	Same Bike
9	Mountain Bikes
10	Electric bikes
\.


--
-- TOC entry 4917 (class 0 OID 16588)
-- Dependencies: 218
-- Data for Name: bike_models; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bike_models (model_id, name, category_id, description, wheel_size, manufacturer, brake_type, price) FROM stdin;
1	Model 1	9	Mountain Bike Model 1	26	Brand A	Disc	2.00
3	Model 3	11	City Bike Model 1	24	Brand A	Disc	3.50
4	Model 4	12	Children Bike Model 1	18	Brand C	Disc	1.50
5	Model 5	9	Mountain Bike Model 2	28	Brand B	Drum	3.00
6	Model 6	11	City Bike Model 1	26	Brand C	Disc	4.00
7	Model 7	12	Children Bike Model 2	18	Brand A	Disc	2.00
8	Model 8	10	Electric Bike Model 2	26	Brand D	Disc	5.00
2	Model changed	9	Mountain Bike Model 1	26	Brand A	Disc	3.00
\.


--
-- TOC entry 4919 (class 0 OID 16594)
-- Dependencies: 220
-- Data for Name: bike_stations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bike_stations (station_id, name, address, latitude, longitude) FROM stdin;
11	Klagenfurt Oberhaidach	Address1	46.638700	14.341817
12	Woerthersee Stadion	Address2	46.612700	14.281817
13	Klinikum Klagenfurt	Address3	46.635700	14.311817
14	Klagenfurt Hbf	Adress4	46.616700	14.311817
17	Station 5	Address5	46.638700	14.241817
\.


--
-- TOC entry 4921 (class 0 OID 16600)
-- Dependencies: 222
-- Data for Name: individual_bikes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.individual_bikes (bike_id, model_id, unique_id, station_id, status) FROM stdin;
2	2	EL001	12	Free
3	2	MTN002	12	Free
4	1	EL002	11	Free
5	5	MTN003	13	Free
6	8	EL003	14	Free
7	5	MTN004	13	Free
9	4	CH001	11	Free
10	4	CH002	12	Free
11	7	CH003	13	Free
12	7	CH004	14	Free
13	6	CI001	11	Free
15	3	CI003	14	Free
1	1	MTN001	11	Free
8	8	EL004	14	Free
14	3	CI002	12	Free
\.


--
-- TOC entry 4923 (class 0 OID 16606)
-- Dependencies: 224
-- Data for Name: parking_places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking_places (place_id, station_id, number, category_id, bike_id) FROM stdin;
25	11	3	9	\N
29	12	7	10	\N
33	12	9	11	\N
34	12	10	11	\N
36	11	9	12	\N
37	12	12	12	\N
22	12	4	10	2
17	11	1	9	\N
20	12	2	12	\N
38	13	1	9	\N
42	13	5	10	\N
43	13	6	11	\N
44	13	7	11	\N
46	14	1	9	\N
47	14	2	9	\N
50	14	5	11	\N
52	14	7	12	\N
26	11	5	10	\N
27	12	8	10	\N
30	11	6	10	\N
24	11	4	9	\N
53	14	8	12	12
54	13	9	12	11
28	12	6	10	10
35	11	10	12	9
41	13	3	9	7
45	13	8	12	\N
49	14	4	10	6
39	13	2	9	5
18	11	2	10	4
21	12	5	9	3
32	11	8	11	13
51	14	6	11	15
23	12	3	9	1
48	14	3	10	\N
40	13	4	10	8
19	12	1	11	\N
31	11	7	11	14
\.


--
-- TOC entry 4925 (class 0 OID 16610)
-- Dependencies: 226
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (review_id, user_id, model_id, station_id, rating, comment) FROM stdin;
1	1	1	11	5	Cool!
2	2	2	12	4	Jo geht eh!
3	1	1	11	4	supi dupi!
4	5	8	14	3	Cooles bike
5	2	1	11	4	Test
\.


--
-- TOC entry 4927 (class 0 OID 16616)
-- Dependencies: 228
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (ticket_id, user_id, model_id, category_id, start_time, end_time, price, status, station_id, bike_id) FROM stdin;
2	5	8	10	2024-02-13 13:58:43.843	2024-02-13 23:58:43.843	50.00	Reviewed	14	8
1	2	1	9	2024-02-13 11:55:08.05	2024-02-13 12:55:08.05	2.00	Reviewed	11	1
3	2	3	11	2024-02-14 09:03:23.323	2024-02-14 12:03:23.323	10.50	Used	12	14
4	2	3	11	2024-02-14 12:12:00	2024-02-14 14:12:00	7.00	Returned	14	15
\.


--
-- TOC entry 4929 (class 0 OID 16621)
-- Dependencies: 230
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, email, password, wallet, isadmin) FROM stdin;
3	admin	admin	0.00	t
1	user1@example.com	password1	100.00	f
5	user4@example.com	password4	50.00	f
2	user2@example.com	password2	142.50	f
\.


--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 217
-- Name: bike_categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bike_categories_category_id_seq', 17, true);


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 219
-- Name: bike_models_model_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bike_models_model_id_seq', 25, true);


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 221
-- Name: bike_stations_station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bike_stations_station_id_seq', 19, true);


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 223
-- Name: individual_bikes_bike_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.individual_bikes_bike_id_seq', 22, true);


--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 225
-- Name: parking_places_place_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parking_places_place_id_seq', 20, true);


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 227
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 5, true);


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 229
-- Name: tickets_ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_ticket_id_seq', 36, true);


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 231
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 5, true);


--
-- TOC entry 4738 (class 2606 OID 16637)
-- Name: bike_categories bike_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_categories
    ADD CONSTRAINT bike_categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4740 (class 2606 OID 16639)
-- Name: bike_models bike_models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_models
    ADD CONSTRAINT bike_models_pkey PRIMARY KEY (model_id);


--
-- TOC entry 4742 (class 2606 OID 16641)
-- Name: bike_stations bike_stations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_stations
    ADD CONSTRAINT bike_stations_pkey PRIMARY KEY (station_id);


--
-- TOC entry 4744 (class 2606 OID 16643)
-- Name: individual_bikes individual_bikes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes
    ADD CONSTRAINT individual_bikes_pkey PRIMARY KEY (bike_id);


--
-- TOC entry 4746 (class 2606 OID 16645)
-- Name: individual_bikes individual_bikes_unique_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes
    ADD CONSTRAINT individual_bikes_unique_id_key UNIQUE (unique_id);


--
-- TOC entry 4748 (class 2606 OID 16647)
-- Name: parking_places parking_places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT parking_places_pkey PRIMARY KEY (place_id);


--
-- TOC entry 4752 (class 2606 OID 16649)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- TOC entry 4754 (class 2606 OID 16651)
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (ticket_id);


--
-- TOC entry 4750 (class 2606 OID 16653)
-- Name: parking_places unique_parking_place; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT unique_parking_place UNIQUE (station_id, number);


--
-- TOC entry 4756 (class 2606 OID 16655)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4758 (class 2606 OID 16657)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4759 (class 2606 OID 16658)
-- Name: bike_models bike_models_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bike_models
    ADD CONSTRAINT bike_models_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.bike_categories(category_id);


--
-- TOC entry 4760 (class 2606 OID 16693)
-- Name: individual_bikes bike_stations_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes
    ADD CONSTRAINT bike_stations_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.bike_stations(station_id) ON DELETE RESTRICT NOT VALID;


--
-- TOC entry 4762 (class 2606 OID 16698)
-- Name: parking_places bike_stations_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT bike_stations_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.bike_stations(station_id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;


--
-- TOC entry 4763 (class 2606 OID 16703)
-- Name: parking_places individual_bikes_bike_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT individual_bikes_bike_id_fkey FOREIGN KEY (bike_id) REFERENCES public.individual_bikes(bike_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4761 (class 2606 OID 16663)
-- Name: individual_bikes individual_bikes_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.individual_bikes
    ADD CONSTRAINT individual_bikes_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.bike_models(model_id);


--
-- TOC entry 4764 (class 2606 OID 16668)
-- Name: parking_places parking_places_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_places
    ADD CONSTRAINT parking_places_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.bike_categories(category_id);


--
-- TOC entry 4765 (class 2606 OID 16673)
-- Name: reviews reviews_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.bike_models(model_id);


--
-- TOC entry 4766 (class 2606 OID 16713)
-- Name: reviews stations_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT stations_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.bike_stations(station_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- TOC entry 4768 (class 2606 OID 16678)
-- Name: tickets tickets_bike_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_bike_id_fkey FOREIGN KEY (bike_id) REFERENCES public.individual_bikes(bike_id);


--
-- TOC entry 4769 (class 2606 OID 16683)
-- Name: tickets tickets_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.bike_categories(category_id);


--
-- TOC entry 4770 (class 2606 OID 16688)
-- Name: tickets tickets_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.bike_models(model_id);


--
-- TOC entry 4771 (class 2606 OID 16718)
-- Name: tickets users, user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "users, user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4767 (class 2606 OID 16708)
-- Name: reviews users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE NOT VALID;


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-02-14 11:55:54

--
-- PostgreSQL database dump complete
--

