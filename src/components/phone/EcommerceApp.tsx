"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  Check,
  Star,
  ChevronRight,
  Flame,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Wallet,
  Tag,
  Gift,
  Truck,
  Phone,
  MessageSquare,
  Award,
  User,
  Home,
  Receipt,
  Sparkles,
  Clock,
  Layers,
  ShieldCheck,
  Send,
  X,
  Store,
  Navigation,
} from "lucide-react";
import { EcommerceStep, BottomTab } from "./types";

// ============================================================================
// 5 SaaS Tenant Brands Configuration
// Demonstrates multi-tenant runtime theme, menu, branches & catalog engine
// ============================================================================
interface TenantBrand {
  id: string;
  name: string;
  tagline: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  promoCode: string;
  promoText: string;
  branches: {
    name: string;
    dist: string;
    time: string;
    status: string;
    busy: string;
  }[];
  categories: {
    name: string;
    count: string;
    icon: string;
    tag: string;
  }[];
  featuredItems: {
    id: string;
    name: string;
    category: string;
    desc: string;
    price: number;
    cal: string;
    rating: string;
    popular: boolean;
    modifier1Name: string;
    modifier1Options: string[];
    modifier2Name: string;
    modifier2Options: string[];
    extras: { name: string; price: number }[];
  }[];
}

const SAAS_TENANTS: TenantBrand[] = [
  {
    id: "burger_lab",
    name: "Burger Lab Gourmet",
    tagline: "Artisan Wagyu & Hand-Cut Sides",
    accentColor: "emerald",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30",
    badgeText: "text-emerald-400",
    icon: "🍔",
    promoCode: "BURGER20",
    promoText: "20% OFF Prime Angus Combos",
    branches: [
      { name: "Riyadh Al-Olaya (Main Flagship)", dist: "1.2 km", time: "15-20 min", status: "Open", busy: "Normal Wait" },
      { name: "Riyadh Diplomatic Quarter", dist: "4.8 km", time: "25-30 min", status: "Open", busy: "Fast Prep" },
      { name: "Riyadh King Abdullah Rd", dist: "7.1 km", time: "35-40 min", status: "Open", busy: "High Demand" },
    ],
    categories: [
      { name: "Signature Burgers", count: "12 items", icon: "🍔", tag: "Popular" },
      { name: "Crispy Chicken", count: "8 items", icon: "🍗", tag: "Hot" },
      { name: "Loaded Fries", count: "6 items", icon: "🍟", tag: "Sides" },
      { name: "Craft Beverages", count: "9 items", icon: "🥤", tag: "Cold" },
      { name: "Desserts & Shakes", count: "5 items", icon: "🍦", tag: "Sweet" },
      { name: "Family Bundles", count: "4 items", icon: "🍱", tag: "Save 30%" },
    ],
    featuredItems: [
      {
        id: "truffle_burger",
        name: "Black Truffle Angus Burger",
        category: "Signature Burgers",
        desc: "200g Wagyu beef, black truffle aioli, aged Swiss, brioche bun",
        price: 48.0,
        cal: "680 kcal",
        rating: "4.9 (420+)",
        popular: true,
        modifier1Name: "Choose Your Bun",
        modifier1Options: ["Brioche Bun", "Potato Bun", "Lettuce Wrap"],
        modifier2Name: "Patty Doneness",
        modifier2Options: ["Medium", "Medium Well", "Well Done"],
        extras: [
          { name: "Aged Cheddar", price: 4.0 },
          { name: "Crispy Beef Bacon", price: 6.0 },
          { name: "Extra Truffle Aioli", price: 3.5 },
          { name: "Pickled Jalapeños", price: 2.0 },
        ],
      },
      {
        id: "smash_double",
        name: "Double Smash Deluxe",
        category: "Signature Burgers",
        desc: "Twin crispy smashed beef patties, house special sauce, pickles",
        price: 39.0,
        cal: "740 kcal",
        rating: "4.8 (310+)",
        popular: true,
        modifier1Name: "Choose Your Bun",
        modifier1Options: ["Brioche Bun", "Potato Bun", "Sesame Bun"],
        modifier2Name: "Cheese Layer",
        modifier2Options: ["Double American", "Aged Swiss", "Ghost Pepper"],
        extras: [
          { name: "Grilled Onions", price: 2.5 },
          { name: "Fried Egg", price: 4.0 },
          { name: "Extra Patty", price: 12.0 },
        ],
      },
      {
        id: "truffle_fries",
        name: "Truffle Parmesan Fries",
        category: "Loaded Fries",
        desc: "Hand-cut Idaho potatoes, rosemary salt, grated Parmesan, truffle glaze",
        price: 18.0,
        cal: "380 kcal",
        rating: "4.9 (530+)",
        popular: true,
        modifier1Name: "Portion Size",
        modifier1Options: ["Regular", "Large (+SAR 5)", "Family Box (+SAR 12)"],
        modifier2Name: "Dipping Sauce",
        modifier2Options: ["Truffle Mayo", "Spicy Ranch", "Smoky BBQ"],
        extras: [
          { name: "Melted Cheese Dip", price: 4.0 },
          { name: "Bacon Bits", price: 3.5 },
        ],
      },
    ],
  },
  {
    id: "roast_brew",
    name: "Artisan Roast & Brew",
    tagline: "Single-Origin Specialty Coffee & Bakery",
    accentColor: "amber",
    badgeBg: "bg-amber-500/10 border-amber-500/30",
    badgeText: "text-amber-400",
    icon: "☕",
    promoCode: "ROAST15",
    promoText: "15% OFF Single-Origin V60 & Cold Brews",
    branches: [
      { name: "Riyadh Al-Takhassusi", dist: "0.8 km", time: "10-15 min", status: "Open", busy: "Fast Prep" },
      { name: "Riyadh KAFD Financial Dist", dist: "3.2 km", time: "20-25 min", status: "Open", busy: "Peak Hours" },
      { name: "Riyadh Laysen Valley", dist: "5.4 km", time: "25-30 min", status: "Open", busy: "Normal Wait" },
    ],
    categories: [
      { name: "Pour-Over & V60", count: "8 items", icon: "☕", tag: "Specialty" },
      { name: "Espresso & Milk", count: "10 items", icon: "🥛", tag: "Bestseller" },
      { name: "Cold Brew & Nitro", count: "5 items", icon: "🧊", tag: "Chilled" },
      { name: "Artisan Pastries", count: "7 items", icon: "🥐", tag: "Fresh Baked" },
      { name: "Matcha & Tea", count: "6 items", icon: "🍵", tag: "Ceremonial" },
      { name: "Whole Coffee Beans", count: "6 items", icon: "🫘", tag: "Retail" },
    ],
    featuredItems: [
      {
        id: "ethiopian_v60",
        name: "Ethiopian Yirgacheffe V60",
        category: "Pour-Over & V60",
        desc: "Floral jasmine notes, bright bergamot citrus, honey finish",
        price: 26.0,
        cal: "5 kcal",
        rating: "4.95 (380+)",
        popular: true,
        modifier1Name: "Extraction Profile",
        modifier1Options: ["Hot V60", "Iced Japanese Drip", "Aeropress"],
        modifier2Name: "Water Profile",
        modifier2Options: ["Mineral Balanced", "Soft Water"],
        extras: [
          { name: "Extra Espresso Shot", price: 5.0 },
          { name: "Butter Croissant Pairing", price: 12.0 },
        ],
      },
      {
        id: "spanish_latte",
        name: "Signature Spanish Latte",
        category: "Espresso & Milk",
        desc: "Double ristretto, caramelized condensed milk, silky microfoam",
        price: 24.0,
        cal: "210 kcal",
        rating: "4.9 (780+)",
        popular: true,
        modifier1Name: "Milk Type",
        modifier1Options: ["Fresh Full Cream", "Oat Milk (+SAR 3)", "Almond Milk (+SAR 3)"],
        modifier2Name: "Sweetness Level",
        modifier2Options: ["100% Classic", "50% Less Sweet", "Sugar Free"],
        extras: [
          { name: "Cinnamon Dusting", price: 1.0 },
          { name: "Caramel Drizzle", price: 2.5 },
        ],
      },
      {
        id: "pistachio_croissant",
        name: "Twice-Baked Pistachio Croissant",
        category: "Artisan Pastries",
        desc: "French butter laminated dough, roasted Bronte pistachio frangipane",
        price: 22.0,
        cal: "390 kcal",
        rating: "4.9 (410+)",
        popular: true,
        modifier1Name: "Serving Preference",
        modifier1Options: ["Warm & Crisp", "Room Temp"],
        modifier2Name: "Packaging",
        modifier2Options: ["Eco Bakery Box", "Immediate To-Go"],
        extras: [
          { name: "Pistachio Glaze Dip", price: 4.0 },
          { name: "Powdered Sugar", price: 0.0 },
        ],
      },
    ],
  },
  {
    id: "napoli_stone",
    name: "Napoli Stone Pizza",
    tagline: "Wood-Fired Neapolitan Sourdough Pizzas",
    accentColor: "rose",
    badgeBg: "bg-rose-500/10 border-rose-500/30",
    badgeText: "text-rose-400",
    icon: "🍕",
    promoCode: "NAPOLI25",
    promoText: "25% OFF 2nd Wood-Fired Pizza",
    branches: [
      { name: "Riyadh As-Sulimaniyah", dist: "1.8 km", time: "20-25 min", status: "Open", busy: "Fast Prep" },
      { name: "Riyadh Al-Hizam", dist: "4.2 km", time: "25-30 min", status: "Open", busy: "Normal Wait" },
      { name: "Riyadh Boulevard City", dist: "8.5 km", time: "40-45 min", status: "Open", busy: "High Demand" },
    ],
    categories: [
      { name: "Classic Neapolitan", count: "9 items", icon: "🍕", tag: "48h Dough" },
      { name: "Gourmet White Base", count: "6 items", icon: "🧀", tag: "Chef Pick" },
      { name: "Calzones & Panuozzo", count: "5 items", icon: "🥟", tag: "Stuffed" },
      { name: "Fresh Antipasti", count: "7 items", icon: "🥗", tag: "Appetizers" },
      { name: "Italian Gelato", count: "6 items", icon: "🍨", tag: "Dessert" },
      { name: "Craft Sodas", count: "5 items", icon: "🍾", tag: "Cold" },
    ],
    featuredItems: [
      {
        id: "burrata_truffle_pizza",
        name: "Burrata & Black Truffle Pizza",
        category: "Gourmet White Base",
        desc: "San Marzano yellow cherry tomato base, creamy whole Pugliese burrata, truffle carpaccio",
        price: 64.0,
        cal: "840 kcal",
        rating: "4.94 (510+)",
        popular: true,
        modifier1Name: "Crust Style",
        modifier1Options: ["Neapolitan Soft Cornicione", "Crispy Romana Thin", "Gluten-Free (+SAR 8)"],
        modifier2Name: "Cheese Finishing",
        modifier2Options: ["Fresh Basil & EVOO", "Hot Chili Honey (+SAR 4)"],
        extras: [
          { name: "Extra Fresh Burrata", price: 14.0 },
          { name: "Wild Rocket Leaves", price: 3.0 },
        ],
      },
      {
        id: "margherita_bufala",
        name: "D.O.P. Margherita con Bufala",
        category: "Classic Neapolitan",
        desc: "San Marzano D.O.P. tomatoes, Campana buffalo mozzarella, fresh basil, extra virgin olive oil",
        price: 46.0,
        cal: "720 kcal",
        rating: "4.88 (620+)",
        popular: true,
        modifier1Name: "Crust Style",
        modifier1Options: ["Neapolitan Soft Cornicione", "Crispy Romana Thin"],
        modifier2Name: "Olive Oil Drizzle",
        modifier2Options: ["Classic Tuscan EVOO", "Garlic Infused EVOO", "Calabrian Chili Oil"],
        extras: [
          { name: "Buffalo Mozzarella Boost", price: 8.0 },
          { name: "Marinated Artichokes", price: 6.0 },
        ],
      },
    ],
  },
  {
    id: "tokyo_bento",
    name: "Tokyo Bento & Roll",
    tagline: "Modern Japanese Handrolls & Bento Kitchen",
    accentColor: "indigo",
    badgeBg: "bg-indigo-500/10 border-indigo-500/30",
    badgeText: "text-indigo-400",
    icon: "🍣",
    promoCode: "TOKYO20",
    promoText: "20% OFF Signature Handroll Sets",
    branches: [
      { name: "Riyadh Al-Mohammadiyyah", dist: "2.1 km", time: "18-22 min", status: "Open", busy: "Fast Prep" },
      { name: "Riyadh Diplomatic Quarter", dist: "5.1 km", time: "25-30 min", status: "Open", busy: "Normal Wait" },
      { name: "Riyadh Granada Mall", dist: "9.3 km", time: "35-40 min", status: "Open", busy: "Peak Hours" },
    ],
    categories: [
      { name: "Signature Handrolls", count: "10 items", icon: "🍣", tag: "Crispy Nori" },
      { name: "Bento Master Boxes", count: "6 items", icon: "🍱", tag: "Complete" },
      { name: "Sashimi & Nigiri", count: "8 items", icon: "🐟", tag: "Daily Fresh" },
      { name: "Ramen & Noodles", count: "5 items", icon: "🍜", tag: "Rich Broth" },
      { name: "Robata Grill", count: "7 items", icon: "🍢", tag: "Yakitori" },
      { name: "Japanese Desserts", count: "4 items", icon: "🍡", tag: "Mochi" },
    ],
    featuredItems: [
      {
        id: "wagyu_bento_box",
        name: "A5 Wagyu Beef Teriyaki Bento",
        category: "Bento Master Boxes",
        desc: "Charred A5 Wagyu striploin, Niigata Koshihikari sushi rice, miso glazed eggplant, lotus chips",
        price: 78.0,
        cal: "650 kcal",
        rating: "4.96 (340+)",
        popular: true,
        modifier1Name: "Rice Base",
        modifier1Options: ["Steamed Koshihikari", "Garlic Butter Fried Rice (+SAR 5)", "Brown Rice"],
        modifier2Name: "Spice Level",
        modifier2Options: ["Mild Teriyaki", "Spicy Togarashi Glaze"],
        extras: [
          { name: "Silken Tofu Miso Soup", price: 8.0 },
          { name: "Spicy Edamame", price: 12.0 },
        ],
      },
      {
        id: "salmon_avocado_roll",
        name: "Crispy Truffle Salmon Roll (8pcs)",
        category: "Signature Handrolls",
        desc: "Torched Atlantic salmon, creamy avocado, crispy tempura flakes, yuzu truffle glaze",
        price: 52.0,
        cal: "490 kcal",
        rating: "4.92 (480+)",
        popular: true,
        modifier1Name: "Preparation Style",
        modifier1Options: ["Torched (Aburi)", "Fresh Raw Sashimi Style"],
        modifier2Name: "Soy & Condiments",
        modifier2Options: ["Low Sodium Soy + Wasabi", "Sweet Unagi Glaze + Ginger"],
        extras: [
          { name: "Spicy Mayo Drizzle", price: 3.0 },
          { name: "Tobiko Roe Garnish", price: 6.0 },
        ],
      },
    ],
  },
  {
    id: "pure_green",
    name: "Pure Green Superfoods",
    tagline: "Cold-Pressed Juices, Acai & Macro Bowls",
    accentColor: "teal",
    badgeBg: "bg-teal-500/10 border-teal-500/30",
    badgeText: "text-teal-400",
    icon: "🥗",
    promoCode: "GREEN30",
    promoText: "30% OFF All Superfood Grain Bowls",
    branches: [
      { name: "Riyadh Al-Nakheel Walk", dist: "1.5 km", time: "12-16 min", status: "Open", busy: "Fast Prep" },
      { name: "Riyadh Diplomatic Square", dist: "4.0 km", time: "20-25 min", status: "Open", busy: "Normal Wait" },
      { name: "Riyadh Hittin District", dist: "6.8 km", time: "30-35 min", status: "Open", busy: "Fast Prep" },
    ],
    categories: [
      { name: "Macro Protein Bowls", count: "8 items", icon: "🥗", tag: "High Protein" },
      { name: "Amazonian Acai Bowls", count: "6 items", icon: "🫐", tag: "Organic" },
      { name: "Cold-Pressed Elixirs", count: "9 items", icon: "🧃", tag: "Raw Juice" },
      { name: "Sourdough Toasts", count: "5 items", icon: "🥑", tag: "Avocado" },
      { name: "Clean Protein Shakes", count: "7 items", icon: "🥤", tag: "30g Protein" },
      { name: "Guilt-Free Bites", count: "5 items", icon: "🥜", tag: "Keto" },
    ],
    featuredItems: [
      {
        id: "salmon_quinoa_bowl",
        name: "Wild Salmon & Avocado Power Bowl",
        category: "Macro Protein Bowls",
        desc: "Herb grilled Atlantic salmon, warm tri-color quinoa, Hass avocado, edamame, ginger miso",
        price: 54.0,
        cal: "520 kcal (42g Protein)",
        rating: "4.93 (290+)",
        popular: true,
        modifier1Name: "Base Foundation",
        modifier1Options: ["Tri-Color Quinoa", "Cauliflower Rice (Low Carb)", "Wild Black Rice"],
        modifier2Name: "Artisan Dressing",
        modifier2Options: ["Ginger Miso Vinaigrette", "Lemon Tahini Herb", "Spicy Chimichurri"],
        extras: [
          { name: "Extra Grilled Salmon (+100g)", price: 16.0 },
          { name: "Chia Seed Sprinkle", price: 2.0 },
          { name: "Poached Free-Range Egg", price: 4.0 },
        ],
      },
      {
        id: "organic_acai",
        name: "Amazonian Dream Acai Bowl",
        category: "Amazonian Acai Bowls",
        desc: "100% pure wild organic acai blend, gluten-free almond granola, fresh berries, raw honey",
        price: 38.0,
        cal: "340 kcal",
        rating: "4.9 (610+)",
        popular: true,
        modifier1Name: "Butter Drizzle",
        modifier1Options: ["Roasted Almond Butter", "Organic Peanut Butter", "No Nut Butter"],
        modifier2Name: "Sweetener",
        modifier2Options: ["Local Raw Honey", "Agave Nectar", "Unsweetened"],
        extras: [
          { name: "Cacao Nibs", price: 3.0 },
          { name: "Coconut Flakes", price: 2.0 },
        ],
      },
    ],
  },
];

export function EcommerceApp() {
  // Current active SaaS tenant brand
  const [activeTenantIdx, setActiveTenantIdx] = useState(0);
  const currentTenant = SAAS_TENANTS[activeTenantIdx];

  // Core navigation state
  const [ecomStep, setEcomStep] = useState<EcommerceStep>("branch");
  const [fulfillmentMode, setFulfillmentMode] = useState<"delivery" | "pickup">("delivery");

  // Selection states
  const [selectedBranch, setSelectedBranch] = useState(currentTenant.branches[0].name);
  const [selectedCategory, setSelectedCategory] = useState(currentTenant.categories[0].name);
  const [activeSelectedItem, setActiveSelectedItem] = useState(currentTenant.featuredItems[0]);

  // Modifiers
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedModifier1, setSelectedModifier1] = useState(currentTenant.featuredItems[0].modifier1Options[0]);
  const [selectedModifier2, setSelectedModifier2] = useState(currentTenant.featuredItems[0].modifier2Options[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: "item-1",
      name: currentTenant.featuredItems[0].name,
      mod1: currentTenant.featuredItems[0].modifier1Options[0],
      mod2: currentTenant.featuredItems[0].modifier2Options[0],
      extras: ["Aged Cheddar"],
      qty: 1,
      unitPrice: currentTenant.featuredItems[0].price,
    },
    {
      id: "item-2",
      name: "Truffle Parmesan Fries",
      mod1: "Regular",
      mod2: "Truffle Mayo",
      extras: [],
      qty: 1,
      unitPrice: 18.0,
    },
  ]);

  // Checkout states
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet" | "cod">("card");
  const [redeemPoints, setRedeemPoints] = useState(true);
  const [couponCode, setCouponCode] = useState(currentTenant.promoCode);
  const [couponApplied, setCouponApplied] = useState(true);
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTab>("home");

  // In-app courier chat modal state
  const [showCourierChat, setShowCourierChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "courier", text: "Salam! I have picked up your order and am riding your way." },
    { sender: "customer", text: "Great, please leave at the front doorstep if possible." },
    { sender: "courier", text: "Understood, ETA ~12 mins!" },
  ]);
  const [chatInput, setChatInput] = useState("");

  // When switching SaaS Tenant, update defaults
  const handleTenantChange = (idx: number) => {
    setActiveTenantIdx(idx);
    const tenant = SAAS_TENANTS[idx];
    setSelectedBranch(tenant.branches[0].name);
    setSelectedCategory(tenant.categories[0].name);
    setActiveSelectedItem(tenant.featuredItems[0]);
    setSelectedModifier1(tenant.featuredItems[0].modifier1Options[0]);
    setSelectedModifier2(tenant.featuredItems[0].modifier2Options[0]);
    setSelectedExtras([]);
    setCouponCode(tenant.promoCode);
    setCouponApplied(true);
  };

  // Totals calculations
  const cartSubtotal = cartItems.reduce((acc, it) => acc + it.unitPrice * it.qty, 0);
  const couponDiscount = couponApplied ? cartSubtotal * 0.2 : 0;
  const pointsDiscount = redeemPoints ? 10.0 : 0.0;
  const finalTotal = Math.max(10.0, cartSubtotal - couponDiscount - pointsDiscount);
  const totalCartCount = cartItems.reduce((acc, it) => acc + it.qty, 0);

  // Send courier chat
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: "customer", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "courier", text: "Got it! Traffic is smooth, almost there." },
      ]);
    }, 1200);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-zinc-950 text-xs select-none">
      {/* =====================================================================
          TOP CONTROLLER & MULTI-TENANT SAAS BAR
          ===================================================================== */}
      <div className="bg-zinc-900/95 border-b border-zinc-800 px-3 py-2 shrink-0 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{currentTenant.icon}</span>
            <div>
              <div className="font-bold text-xs text-white leading-tight">{currentTenant.name}</div>
              <div className="text-[9px] text-zinc-400 font-mono">SaaS Tenant {activeTenantIdx + 1} of 5</div>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            5 SaaS Suite
          </span>
        </div>

        {/* 5-Tenant Selector Pills */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5">
          {SAAS_TENANTS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTenantChange(idx)}
              className={`shrink-0 px-2 py-1 rounded-lg text-[9px] font-semibold transition flex items-center gap-1 cursor-pointer touch-manipulation ${
                activeTenantIdx === idx
                  ? "bg-emerald-600 text-white shadow-sm font-bold"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          SCROLLABLE PHONE BODY CONTENT
          ===================================================================== */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 space-y-3">
        {/* -------------------------------------------------------------
            STAGE 1: BRANCH & FULFILLMENT SELECTION
            ------------------------------------------------------------- */}
        {ecomStep === "branch" && (
          <div className="space-y-3 animate-fade-in">
            {/* Brand Header Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 text-center space-y-1">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-1 border border-emerald-500/20 text-lg shadow-sm">
                {currentTenant.icon}
              </div>
              <div className="font-black text-sm text-white">{currentTenant.name}</div>
              <div className="text-[10px] text-zinc-400">{currentTenant.tagline}</div>
            </div>

            {/* Delivery vs Curbside Pickup Switcher */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px]">
              <button
                onClick={() => setFulfillmentMode("delivery")}
                className={`py-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  fulfillmentMode === "delivery"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Truck className="w-3 h-3" />
                <span>Door Delivery</span>
              </button>
              <button
                onClick={() => setFulfillmentMode("pickup")}
                className={`py-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  fulfillmentMode === "pickup"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Store className="w-3 h-3" />
                <span>Curbside Pickup</span>
              </button>
            </div>

            {/* Search Branches Input */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400">
              <Search className="w-3.5 h-3.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search branches in Riyadh..."
                className="bg-transparent text-white w-full focus:outline-none placeholder-zinc-500 text-[10px]"
                readOnly
                value={`Showing ${currentTenant.branches.length} locations near you`}
              />
            </div>

            {/* Branch Cards */}
            <div className="space-y-2">
              {currentTenant.branches.map((b) => (
                <div
                  key={b.name}
                  onClick={() => {
                    setSelectedBranch(b.name);
                    setEcomStep("dashboard");
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    selectedBranch === b.name
                      ? "bg-zinc-900 border-emerald-500 shadow-lg shadow-emerald-950/30"
                      : "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{b.name}</span>
                        {selectedBranch === b.name && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-1 flex items-center gap-2 font-mono">
                        <span>{b.dist}</span>
                        <span>•</span>
                        <span className="text-zinc-300 font-semibold">{b.time}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {b.busy}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500">Live Kitchen Inventory Synced</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                      Explore Menu →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            STAGE 2: MENU DASHBOARD & PROMOS
            ------------------------------------------------------------- */}
        {ecomStep === "dashboard" && (
          <div className="space-y-3 animate-fade-in">
            {/* Active Branch Header */}
            <div className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="font-bold text-white text-xs">{selectedBranch}</div>
                  <div className="text-[9px] text-zinc-400 font-mono">
                    {fulfillmentMode === "delivery" ? "Door Delivery (15-20 min)" : "Curbside Bay Ready"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEcomStep("branch")}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold underline"
              >
                Change
              </button>
            </div>

            {/* Tenant Promo Hero Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-zinc-950 border border-emerald-500/40 text-white space-y-1 relative overflow-hidden shadow-lg shadow-emerald-950/20">
              <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Special Multi-Tenant Offer</span>
              </div>
              <div className="font-black text-sm">{currentTenant.promoText}</div>
              <div className="text-[10px] text-zinc-300 font-mono">
                Use code <span className="text-emerald-300 font-bold">{currentTenant.promoCode}</span> at checkout
              </div>
            </div>

            {/* Quick Filter Capsules */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {["All", "Bestsellers 🔥", "Chef Specials ⭐", "Combos 🍱", "New ✨"].map((filter, i) => (
                <button
                  key={filter}
                  className={`shrink-0 px-2.5 py-1 rounded-full text-[9px] font-semibold transition border ${
                    i === 0
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Category Grid */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <span className="font-bold text-white text-xs">Menu Categories</span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {currentTenant.categories.length} Categories
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {currentTenant.categories.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => {
                      setSelectedCategory(c.name);
                      setEcomStep("category_items");
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      selectedCategory === c.name
                        ? "bg-zinc-900 border-emerald-500"
                        : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="text-2xl mb-1">{c.icon}</div>
                    <div className="font-bold text-white text-xs leading-tight">{c.name}</div>
                    <div className="flex justify-between items-center mt-1 text-[9px] text-zinc-400">
                      <span>{c.count}</span>
                      <span className="text-emerald-400 font-mono font-semibold">{c.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bestselling Spotlight */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center px-1">
                <span className="font-bold text-white text-xs flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Trending Highlights</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Top Rated</span>
              </div>

              <div className="space-y-2">
                {currentTenant.featuredItems.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveSelectedItem(item);
                      setSelectedModifier1(item.modifier1Options[0]);
                      setSelectedModifier2(item.modifier2Options[0]);
                      setEcomStep("item_details");
                    }}
                    className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 transition cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{item.name}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                        {item.cal} • ★ {item.rating}
                      </div>
                      <div className="text-emerald-400 font-mono font-bold text-xs mt-1">
                        SAR {item.price.toFixed(2)}
                      </div>
                    </div>
                    <button className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]">
                      View &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            STAGE 3: CATEGORY ITEMS LIST
            ------------------------------------------------------------- */}
        {ecomStep === "category_items" && (
          <div className="space-y-3 animate-fade-in">
            {/* Header Strip with Back Button */}
            <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
              <button
                onClick={() => setEcomStep("dashboard")}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <span>&larr; Categories</span>
              </button>
              <div className="font-bold text-white text-xs">{selectedCategory}</div>
              <span className="text-[10px] text-zinc-500 font-mono">
                {currentTenant.featuredItems.length} items
              </span>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              {currentTenant.featuredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveSelectedItem(item);
                    setSelectedModifier1(item.modifier1Options[0]);
                    setSelectedModifier2(item.modifier2Options[0]);
                    setEcomStep("item_details");
                  }}
                  className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 transition cursor-pointer space-y-2 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-xs">{item.name}</span>
                        {item.popular && (
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                            TOP PICK
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1 leading-snug">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800/60 text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-emerald-400 font-mono text-xs">
                        SAR {item.price.toFixed(2)}
                      </span>
                      <span className="text-zinc-500 font-mono">{item.cal}</span>
                      <span className="text-zinc-400 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                        <span>{item.rating}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSelectedItem(item);
                        setSelectedModifier1(item.modifier1Options[0]);
                        setSelectedModifier2(item.modifier2Options[0]);
                        setEcomStep("item_details");
                      }}
                      className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition"
                    >
                      Customize &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            STAGE 4: ITEM DETAILS & MODIFIERS
            ------------------------------------------------------------- */}
        {ecomStep === "item_details" && (
          <div className="space-y-3 animate-fade-in">
            {/* Back Button */}
            <button
              onClick={() => setEcomStep("category_items")}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>&larr; Back to {selectedCategory}</span>
            </button>

            {/* Product Hero Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 space-y-1.5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-black text-sm text-white">{activeSelectedItem.name}</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    {activeSelectedItem.cal} • ★ {activeSelectedItem.rating}
                  </div>
                </div>
                <div className="font-mono font-black text-emerald-400 text-sm">
                  SAR {activeSelectedItem.price.toFixed(2)}
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 leading-snug">{activeSelectedItem.desc}</p>
            </div>

            {/* Modifier Group 1 */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-white">1. {activeSelectedItem.modifier1Name}</span>
                <span className="text-[9px] text-emerald-400 font-mono font-semibold">Required</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {activeSelectedItem.modifier1Options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedModifier1(opt)}
                    className={`py-1.5 px-1.5 rounded-xl text-[10px] font-semibold transition text-center ${
                      selectedModifier1 === opt
                        ? "bg-emerald-600 text-white font-bold shadow-sm"
                        : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Modifier Group 2 */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-white">2. {activeSelectedItem.modifier2Name}</span>
                <span className="text-[9px] text-emerald-400 font-mono font-semibold">Required</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {activeSelectedItem.modifier2Options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedModifier2(opt)}
                    className={`py-1.5 px-1.5 rounded-xl text-[10px] font-semibold transition text-center ${
                      selectedModifier2 === opt
                        ? "bg-emerald-600 text-white font-bold shadow-sm"
                        : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Modifier Group 3: Extra Add-ons */}
            {activeSelectedItem.extras.length > 0 && (
              <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-white">3. Premium Add-ons</span>
                  <span className="text-[9px] text-zinc-400 font-mono">Optional</span>
                </div>
                <div className="space-y-1 pt-1">
                  {activeSelectedItem.extras.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.name);
                    return (
                      <div
                        key={extra.name}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedExtras(selectedExtras.filter((x) => x !== extra.name));
                          } else {
                            setSelectedExtras([...selectedExtras, extra.name]);
                          }
                        }}
                        className={`p-2 rounded-xl border flex justify-between items-center cursor-pointer transition text-[10px] ${
                          isChecked
                            ? "bg-emerald-500/10 border-emerald-500/50 text-white"
                            : "bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                              isChecked ? "bg-emerald-600 border-emerald-500" : "border-zinc-700"
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span className="font-medium">{extra.name}</span>
                        </div>
                        <span className="font-mono text-emerald-400">+SAR {extra.price.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <span className="font-bold text-white text-[10px]">Special Instructions</span>
              <input
                type="text"
                placeholder="e.g. Extra napkins, sauce on the side..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-[10px] focus:outline-none focus:border-emerald-500 placeholder-zinc-600"
              />
            </div>

            {/* Quantity Stepper & Add to Cart CTA */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                <button
                  onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                  className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono font-bold text-white px-2">{itemQuantity}</span>
                <button
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                  className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={() => {
                  const extrasPrice = activeSelectedItem.extras
                    .filter((e) => selectedExtras.includes(e.name))
                    .reduce((a, b) => a + b.price, 0);
                  const newItem = {
                    id: `item-${Date.now()}`,
                    name: activeSelectedItem.name,
                    mod1: selectedModifier1,
                    mod2: selectedModifier2,
                    extras: selectedExtras,
                    qty: itemQuantity,
                    unitPrice: activeSelectedItem.price + extrasPrice,
                  };
                  setCartItems([newItem, ...cartItems]);
                  setActiveBottomTab("cart");
                  setEcomStep("cart");
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950 transition"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>
                  Add to Cart • SAR{" "}
                  {(
                    (activeSelectedItem.price +
                      activeSelectedItem.extras
                        .filter((e) => selectedExtras.includes(e.name))
                        .reduce((a, b) => a + b.price, 0)) *
                    itemQuantity
                  ).toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            STAGE 5: CART QUANTITY & REVIEW
            ------------------------------------------------------------- */}
        {ecomStep === "cart" && (
          <div className="space-y-3 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center pb-1 border-b border-zinc-800">
              <div className="font-black text-sm text-white">Your Order Cart</div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {totalCartCount} items
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-2">
              {cartItems.map((cItem, idx) => (
                <div key={cItem.id ?? idx} className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-xs">{cItem.name}</div>
                      <div className="text-[9px] text-zinc-400 mt-0.5">
                        {cItem.mod1} • {cItem.mod2}
                      </div>
                      {cItem.extras.length > 0 && (
                        <div className="text-[9px] text-emerald-400 mt-0.5">
                          Extras: {cItem.extras.join(", ")}
                        </div>
                      )}
                    </div>
                    <div className="font-mono font-black text-white text-xs">
                      SAR {(cItem.unitPrice * cItem.qty).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500">Unit: SAR {cItem.unitPrice.toFixed(2)}</span>
                    <div className="flex items-center gap-2 bg-zinc-950 p-0.5 rounded-lg border border-zinc-800">
                      <button
                        onClick={() => {
                          if (cItem.qty <= 1) {
                            setCartItems(cartItems.filter((_, i) => i !== idx));
                          } else {
                            const updated = [...cartItems];
                            updated[idx].qty -= 1;
                            setCartItems(updated);
                          }
                        }}
                        className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-xs"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="font-mono font-bold text-white text-[11px] px-1">
                        {cItem.qty}
                      </span>
                      <button
                        onClick={() => {
                          const updated = [...cartItems];
                          updated[idx].qty += 1;
                          setCartItems(updated);
                        }}
                        className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-xs"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cross-Sell Quick Add */}
            <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
              <span className="font-bold text-white text-[10px]">Frequently Added Together</span>
              <div className="flex justify-between items-center text-[10px] p-1.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <div className="flex items-center gap-1.5">
                  <span>🥤</span>
                  <span className="text-zinc-300 font-medium">Craft Sparkling Lemonade</span>
                  <span className="font-mono text-emerald-400">+SAR 12.00</span>
                </div>
                <button
                  onClick={() => {
                    setCartItems([
                      ...cartItems,
                      {
                        id: `add-${Date.now()}`,
                        name: "Craft Sparkling Lemonade",
                        mod1: "Chilled",
                        mod2: "Less Ice",
                        extras: [],
                        qty: 1,
                        unitPrice: 12.0,
                      },
                    ]);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-emerald-600/30 text-emerald-400 font-bold border border-emerald-500/40 hover:bg-emerald-600 hover:text-white transition"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Order Summary Calculation */}
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1.5 text-[10px]">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal ({totalCartCount} items)</span>
                <span className="font-mono">SAR {cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Fulfillment ({fulfillmentMode === "delivery" ? "Express Delivery" : "Curbside Pickup"})</span>
                <span className="font-mono text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>VAT (15% Included)</span>
                <span className="font-mono">SAR {(cartSubtotal * 0.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold pt-1.5 border-t border-zinc-800 text-xs">
                <span>Estimated Total</span>
                <span className="font-mono text-emerald-400">SAR {cartSubtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => {
                setActiveBottomTab("orders");
                setEcomStep("checkout");
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950 transition"
            >
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* -------------------------------------------------------------
            STAGE 6: CHECKOUT SCREEN (PAYMENT, LOYALTY, COUPONS)
            ------------------------------------------------------------- */}
        {ecomStep === "checkout" && (
          <div className="space-y-3 animate-fade-in">
            {/* Header & Branch Info */}
            <div className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 font-mono">Fulfillment Destination</span>
                <span className="text-emerald-400 font-semibold font-mono">15-20 min</span>
              </div>
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedBranch}</span>
              </div>
            </div>

            {/* Payment Methods (Radio Buttons) */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="font-bold text-white text-xs mb-1">Select Payment Method</div>
              <div className="space-y-1.5">
                {[
                  {
                    id: "card",
                    name: "Credit / Debit Card (Mada, Visa, MC)",
                    desc: "•••• 4242 • Instant 3D Secure",
                    icon: <CreditCard className="w-3.5 h-3.5 text-emerald-400" />,
                  },
                  {
                    id: "wallet",
                    name: "Digital Wallet / Mobile Pay",
                    desc: "Fast biometric 1-tap checkout",
                    icon: <Wallet className="w-3.5 h-3.5 text-purple-400" />,
                  },
                  {
                    id: "cod",
                    name: "Cash on Delivery / POS Terminal",
                    desc: "Pay card or cash at delivery rider",
                    icon: <Tag className="w-3.5 h-3.5 text-amber-400" />,
                  },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as "card" | "wallet" | "cod")}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === m.id
                        ? "bg-emerald-500/10 border-emerald-500"
                        : "bg-zinc-950 border-zinc-800/80 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === m.id ? "border-emerald-500 bg-emerald-500" : "border-zinc-700"
                        }`}
                      >
                        {paymentMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-[11px] flex items-center gap-1">
                          {m.icon}
                          <span>{m.name}</span>
                        </div>
                        <div className="text-[9px] text-zinc-400 mt-0.5">{m.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty Points Section */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>VIP Loyalty Rewards</span>
                </div>
                <span className="font-mono text-amber-400 font-bold">450 PTS Available</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px]">
                <div>
                  <div className="text-zinc-300 font-semibold">Redeem 200 PTS (Save SAR 10.00)</div>
                  <div className="text-[9px] text-zinc-500">Remaining after order: 250 PTS</div>
                </div>
                <input
                  type="checkbox"
                  checked={redeemPoints}
                  onChange={(e) => setRedeemPoints(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            {/* Coupons Section */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Apply Promotional Coupon</span>
                </div>
                {couponApplied && (
                  <span className="text-emerald-400 font-mono text-[9px] font-bold">-20% Applied</span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter promo code"
                  className="flex-1 p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-[10px] uppercase focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => setCouponApplied(true)}
                  className="px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-bold text-[10px] transition border border-zinc-700"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Final Order Total */}
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1 text-[10px]">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal (Items)</span>
                <span className="font-mono">SAR {cartSubtotal.toFixed(2)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Coupon Discount ({couponCode})</span>
                  <span className="font-mono">-SAR {couponDiscount.toFixed(2)}</span>
                </div>
              )}
              {redeemPoints && (
                <div className="flex justify-between text-amber-400 font-medium">
                  <span>Loyalty Points Discount</span>
                  <span className="font-mono">-SAR {pointsDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-black pt-1 border-t border-emerald-500/20 text-xs">
                <span>Total Amount Due</span>
                <span className="font-mono text-emerald-400 text-sm">SAR {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={() => {
                setEcomStep("order_details");
                setActiveBottomTab("orders");
              }}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xl shadow-emerald-950 transition active:scale-95"
            >
              <span>Place Order &amp; Start Live GPS Tracking</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* -------------------------------------------------------------
            STAGE 7: ORDER DETAILS & LIVE GPS RADAR TRACKING
            ------------------------------------------------------------- */}
        {ecomStep === "order_details" && (
          <div className="space-y-3 animate-fade-in">
            {/* Order Confirmed Banner */}
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1">
                <Check className="w-4 h-4" />
              </div>
              <div className="font-black text-white text-xs">Order Confirmed #SAAS-9842</div>
              <div className="text-[10px] text-emerald-300 font-mono">
                Estimated Delivery: 18 Minutes (12:48 PM)
              </div>
            </div>

            {/* 4-Step Live Order Progress Timeline */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-white">
                <span>Order Status</span>
                <span className="text-emerald-400 font-mono">Rider Dispatched</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[8px] font-mono text-center pt-1">
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-emerald-400 font-bold">Placed</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-emerald-400 font-bold">Prepped</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 font-bold">On Way</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-zinc-800" />
                  <span className="text-zinc-600">Arrived</span>
                </div>
              </div>
            </div>

            {/* Simulated Live GPS Map with Radar Wave */}
            <div className="relative w-full h-40 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
              {/* Radar Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

              {/* Pulsing GPS Radar Ring */}
              <div className="absolute w-32 h-32 rounded-full border border-emerald-500/40 animate-ping opacity-25" />
              <div className="absolute w-20 h-20 rounded-full border border-emerald-400/60 animate-pulse" />

              {/* Branch Kitchen Marker */}
              <div className="absolute left-6 top-6 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-emerald-400 flex items-center justify-center text-xs shadow-md">
                  🏪
                </div>
                <span className="text-[8px] font-mono text-zinc-300 mt-0.5">Kitchen</span>
              </div>

              {/* Simulated Dotted Trajectory Line */}
              <div className="absolute w-44 h-0.5 border-b-2 border-dashed border-emerald-500/50 rotate-[-18deg]" />

              {/* Courier Bike Moving Marker */}
              <div className="absolute flex flex-col items-center animate-bounce z-10">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-mono font-bold text-emerald-300 bg-black/80 px-1.5 py-0.2 rounded mt-0.5 border border-emerald-500/40">
                  Rider: Tariq (2.1 km)
                </span>
              </div>

              {/* Customer Destination Marker */}
              <div className="absolute right-6 bottom-6 flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-cyan-400 flex items-center justify-center text-xs shadow-md">
                  📍
                </div>
                <span className="text-[8px] font-mono text-zinc-300 mt-0.5">You</span>
              </div>
            </div>

            {/* Courier Profile & Contact Bar */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-white">
                  TA
                </div>
                <div>
                  <div className="font-bold text-white text-xs">Tariq Al-Harbi</div>
                  <div className="text-[10px] text-zinc-400">Toyota Hilux • KSA-8832</div>
                  <div className="text-[9px] text-emerald-400 font-mono">
                    ★ 4.95 Rating (1,420 Deliveries)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-zinc-700"
                  title="Call Courier"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShowCourierChat(!showCourierChat)}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-cyan-400 border border-zinc-700 relative"
                  title="Chat with Courier"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
                </button>
              </div>
            </div>

            {/* Interactive In-App Courier Chat Drawer */}
            {showCourierChat && (
              <div className="p-3 rounded-2xl bg-zinc-900 border border-cyan-500/40 space-y-2 animate-fade-in">
                <div className="flex justify-between items-center pb-1 border-b border-zinc-800">
                  <span className="font-bold text-white text-[10px] flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-cyan-400" />
                    <span>In-App Chat with Rider</span>
                  </span>
                  <button
                    onClick={() => setShowCourierChat(false)}
                    className="text-zinc-500 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`text-[9px] p-1.5 rounded-xl max-w-[85%] ${
                        msg.sender === "customer"
                          ? "ml-auto bg-emerald-600 text-white"
                          : "bg-zinc-800 text-zinc-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 pt-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    placeholder="Message courier..."
                    className="flex-1 p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-[9px] focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleSendChat}
                    className="px-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[9px] font-bold"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Order Items Receipt Accordion */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5 text-[10px]">
              <div className="flex justify-between items-center pb-1 border-b border-zinc-800">
                <span className="font-bold text-zinc-300 uppercase font-mono">Receipt Summary</span>
                <span className="text-emerald-400 font-mono">Paid via {paymentMethod}</span>
              </div>
              {cartItems.map((it, idx) => (
                <div key={idx} className="flex justify-between text-zinc-300">
                  <span>
                    {it.qty}x {it.name} ({it.mod1})
                  </span>
                  <span className="font-mono">SAR {(it.unitPrice * it.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-white font-bold pt-1 border-t border-zinc-800">
                <span>Grand Total</span>
                <span className="font-mono text-emerald-400">SAR {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Order Next Actions */}
            <div className="pt-1 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEcomStep("dashboard");
                  setActiveBottomTab("home");
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>Order More Items</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEcomStep("branch");
                  setActiveBottomTab("home");
                }}
                className="py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold hover:border-zinc-700 transition"
              >
                Change Branch
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            STAGE 8: REWARDS & LOYALTY SCREEN
            ------------------------------------------------------------- */}
        {ecomStep === "rewards" && (
          <div className="space-y-3 animate-fade-in">
            <div className="font-bold text-white text-sm">VIP Loyalty Rewards</div>

            {/* Gold Tier VIP Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white shadow-lg space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[9px] uppercase font-mono tracking-wider opacity-90">
                    SaaS Multi-Brand Loyalty
                  </div>
                  <div className="font-black text-base mt-0.5">Gold VIP Member</div>
                </div>
                <Award className="w-6 h-6 text-amber-200" />
              </div>

              <div className="pt-2 flex justify-between items-end border-t border-amber-500/30">
                <div>
                  <div className="text-[9px] opacity-80">Available Points Balance</div>
                  <div className="font-black text-xl font-mono">450 PTS</div>
                </div>
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-mono">
                  Value: SAR 22.50
                </span>
              </div>
            </div>

            {/* Tier Progress */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-zinc-400 font-semibold">Tier Progress: Gold to Platinum</span>
                <span className="text-amber-400 font-mono font-bold">450 / 800 PTS</span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 w-[56%]" />
              </div>
              <div className="text-[9px] text-zinc-500">
                Earn 350 more points across any of the 5 SaaS apps to unlock Free Delivery for 1 year!
              </div>
            </div>

            {/* Redeemable Perks */}
            <div className="space-y-2">
              <div className="font-bold text-white text-xs">Redeem Rewards</div>
              {[
                { name: "Free Truffle Fries", pts: "150 PTS", icon: "🍟" },
                { name: "SAR 25.00 Off Next Order", pts: "300 PTS", icon: "🏷️" },
                { name: "Free Signature Burger", pts: "500 PTS", icon: "🍔" },
              ].map((perk) => (
                <div
                  key={perk.name}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center text-[10px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{perk.icon}</span>
                    <span className="font-bold text-white">{perk.name}</span>
                  </div>
                  <button className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-mono font-bold border border-zinc-700">
                    {perk.pts}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            STAGE 9: USER PROFILE SCREEN
            ------------------------------------------------------------- */}
        {ecomStep === "profile" && (
          <div className="space-y-3 animate-fade-in">
            {/* User Profile Card */}
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                HA
              </div>
              <div>
                <div className="font-bold text-white text-xs">Hammad Ahmed</div>
                <div className="text-[10px] text-zinc-400">hammad@developer.sa</div>
                <span className="text-[9px] text-emerald-400 font-mono font-semibold">
                  Gold VIP Customer • Multi-Tenant Account
                </span>
              </div>
            </div>

            {/* Account Settings List */}
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-[10px]">
              {[
                { title: "Saved Delivery Addresses", meta: "Riyadh Al-Olaya Villa 4" },
                { title: "Saved Payment Cards", meta: "Mada •••• 4242 & Digital Wallet" },
                { title: "Past Orders & Receipts", meta: "14 Orders completed across SaaS brands" },
                { title: "Multi-Tenant Brand Preferences", meta: "Single-Sign-On Synced" },
                { title: "Notification Preferences", meta: "SMS & Push Active" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80 flex justify-between items-center cursor-pointer hover:border-zinc-700"
                >
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-[9px] text-zinc-500">{item.meta}</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          PERSISTENT 5-TAB BOTTOM NAVIGATION BAR
          ===================================================================== */}
      <div className="h-12 bg-zinc-900/95 border-t border-zinc-800 px-3 flex items-center justify-between text-[9px] font-medium shrink-0">
        <button
          type="button"
          onClick={() => {
            setActiveBottomTab("home");
            setEcomStep("dashboard");
          }}
          className={`flex flex-col items-center gap-0.5 transition cursor-pointer touch-manipulation py-1 ${
            activeBottomTab === "home" ? "text-emerald-400 font-bold" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveBottomTab("rewards");
            setEcomStep("rewards");
          }}
          className={`flex flex-col items-center gap-0.5 transition cursor-pointer touch-manipulation py-1 ${
            activeBottomTab === "rewards" ? "text-emerald-400 font-bold" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Rewards</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveBottomTab("cart");
            setEcomStep("cart");
          }}
          className={`flex flex-col items-center gap-0.5 transition relative cursor-pointer touch-manipulation py-1 ${
            activeBottomTab === "cart" ? "text-emerald-400 font-bold" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Cart</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-emerald-500 text-black font-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveBottomTab("orders");
            setEcomStep("order_details");
          }}
          className={`flex flex-col items-center gap-0.5 transition cursor-pointer touch-manipulation py-1 ${
            activeBottomTab === "orders" ? "text-emerald-400 font-bold" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>Orders</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveBottomTab("profile");
            setEcomStep("profile");
          }}
          className={`flex flex-col items-center gap-0.5 transition cursor-pointer touch-manipulation py-1 ${
            activeBottomTab === "profile" ? "text-emerald-400 font-bold" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
