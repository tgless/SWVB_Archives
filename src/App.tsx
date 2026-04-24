import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Home,
  Upload,
  Newspaper,
  Volleyball,
  Flag,
  Shirt,
  Camera,
  Book,
  Image as ImageIcon,
  Trophy,
  Award,
  List,
  Video,
  Search,
} from "lucide-react";

const supabase = createClient(
  "https://kagyiknanfzbtchjikhn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZ3lpa25hbmZ6YnRjaGppa2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzU2NjcsImV4cCI6MjA5MDY1MTY2N30.pA8UO7Rkm4O-NMQxoDiv095VV476jRKlDjHyQS8XhyA"
);

const categoryConfig: Array<{ name: string; icon: any }> = [
  { name: "Articles", icon: Newspaper },
  { name: "Balls", icon: Volleyball },
  { name: "Banners", icon: Flag },
  { name: "Jerseys", icon: Shirt },
  { name: "Memorabilia", icon: Book },
  { name: "Photos", icon: Camera },
  { name: "Plaques", icon: Award },
  { name: "Posters", icon: ImageIcon },
  { name: "Trophies", icon: Trophy },
  { name: "Videos", icon: Video },
];

const CURRENT_YEAR = new Date().getFullYear();
const EARLIEST_YEAR = 1976;

const YEARS = Array.from({ length: CURRENT_YEAR - EARLIEST_YEAR + 1 }, (_, i) =>
  String(CURRENT_YEAR - i)
);
const STORAGE_OPTIONS = [
  "Home of Champions",
  "Locker Room AV Closet - Counter/Lower Cabinets",
  "Locker Room AV Closet - Upper Cabinets",
  "Locker Room Lounge",
  "Locker Room Storage Closet - C1",
  "Locker Room Storage Closet - C2",
  "Locker Room Storage Closet - C3",
  "Locker Room Storage Closet - C4",
  "Locker Room Storage Closet - D1",
  "Locker Room Storage Closet - D2",
  "Locker Room Storage Closet - D3",
  "VB Office Suite",
  "MJ/RC Office",
  "TG/WB Office",
  "KH Office",
];

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f2eff0",
    color: "#334155",
    fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    paddingBottom: "92px",
  },
  banner: {
    position: "relative",
    overflow: "hidden",
    backgroundImage: "url('/banner-photo.png')",
    backgroundSize: "120%",
    backgroundPosition: "center 50%",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "300px",
    height: "40vh",
    maxHeight: "500px",
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(140, 21, 21, 0.28)",
  },
  bannerInner: {
    position: "relative",
    maxWidth: "1200px",
    height: "100%", // 🔥 important
    margin: "0 auto",
    padding: "24px 20px",
    display: "flex",
    alignItems: "flex-end", // 🔥 moves content to bottom
    gap: "20px",
    boxSizing: "border-box",
  },
  logoBox: {
    marginTop: "4px",
    width: "84px",
    height: "84px",
    borderRadius: "14px",
    border: "4px solid white",
    background: "#8c1515",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "56px",
    fontWeight: 900,
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
    flexShrink: 0,
  },
  bannerTitleWrap: {
    marginTop: "40px",
    padding: "0",
    background: "transparent",
    borderRadius: "0",
    boxShadow: "none",
  },
  bannerTitle: {
    margin: 0,
    color: "white",
    fontSize: "42px",
    fontWeight: 800,
    lineHeight: 1.1,
  },
  sectionHeader: {
    background: "#f5f2f3",
    borderTop: "1px solid #d8d0d2",
    borderBottom: "1px solid #d8d0d2",
    padding: "18px 24px 14px",
  },
  sectionTitle: {
    margin: 0,
    color: "#8c1515",
    fontSize: "28px",
    fontWeight: 800,
  },
  sectionSubtitle: {
    margin: "10px 0 0",
    color: "#5b6470",
    fontSize: "18px",
    fontWeight: 600,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
    boxSizing: "border-box",
  },
  yearGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
  },
  yearButton: {
    border: "none",
    borderRadius: "12px",
    padding: "16px 10px",
    color: "white",
    background: "#566174",
    fontSize: "26px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  yearButtonMuted: {
    background: "#8b94a3",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  categoryCard: {
    width: "100%",
    background: "white",
    border: "1px solid #dde2e7",
    borderRadius: "16px",
    padding: "18px 12px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  categoryIconWrap: {
    width: "86px",
    height: "86px",
    borderRadius: "18px",
    background: "#f4f1f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#8c1515",
    marginBottom: "14px",
  },
  categoryLabel: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#374151",
    textAlign: "center",
  },
  card: {
    background: "white",
    border: "1px solid #dde2e7",
    borderRadius: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  cardBody: {
    padding: "18px",
  },
  input: {
    width: "100%",
    height: "48px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    padding: "0 14px",
    fontSize: "16px",
    boxSizing: "border-box",
    background: "white",
  },
  fileInput: {
    width: "100%",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    padding: "12px 14px",
    fontSize: "16px",
    boxSizing: "border-box",
    background: "white",
  },
  select: {
    width: "100%",
    height: "48px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    padding: "0 14px",
    fontSize: "16px",
    boxSizing: "border-box",
    background: "white",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#334155",
    fontWeight: 700,
    fontSize: "15px",
  },
  field: {
    marginBottom: "18px",
  },
  primaryButton: {
    border: "none",
    borderRadius: "12px",
    padding: "14px 18px",
    background: "#8c1515",
    color: "white",
    fontSize: "18px",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryButton: {
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    padding: "12px 16px",
    background: "white",
    color: "#334155",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },

  suggestionsBox: {
    marginTop: "8px",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    background: "white",
    overflow: "hidden",
  },

  suggestionItem: {
    width: "100%",
    textAlign: "left",
    padding: "10px 14px",
    border: "none",
    borderBottom: "1px solid #e5e7eb",
    background: "white",
    color: "#334155",
    cursor: "pointer",
    fontSize: "15px",
  },

  chipWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "10px",
  },

  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#f4f1f2",
    border: "1px solid #dde2e7",
    color: "#334155",
    fontSize: "14px",
  },

  chipRemove: {
    border: "none",
    background: "transparent",
    color: "#8c1515",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "14px",
  },
  actionRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  statBox: {
    borderRadius: "18px",
    background: "#f4f1f2",
    padding: "18px",
  },
  statLabel: {
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#64748b",
    margin: 0,
  },
  statValue: {
    fontSize: "40px",
    fontWeight: 800,
    color: "#1f2937",
    margin: "10px 0 0",
  },
  bottomNav: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    background: "#8c1515",
    color: "white",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    zIndex: 20,
  },
  navButton: {
    border: "none",
    borderRight: "1px solid rgba(255,255,255,0.2)",
    background: "#8c1515",
    color: "white",
    padding: "14px 8px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 700,
  },
  navButtonActive: {
    background: "#7a1212",
  },
};

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {subtitle ? <p style={styles.sectionSubtitle}>{subtitle}</p> : null}
    </div>
  );
}

function StanfordBanner() {
  return (
    <div style={styles.banner}>
      <div style={styles.bannerOverlay} />
      <div style={styles.bannerInner}>
        <div style={styles.logoBox}>
          <img
            src="/stanford-logo.png"
            alt="Stanford logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </div>
        <div style={styles.bannerTitleWrap}>
          <h1 style={styles.bannerTitle}>
            Stanford Women's Volleyball Archives
          </h1>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  name,
  Icon,
  onClick,
}: {
  name: string;
  Icon: any;
  onClick: () => void;
}) {
  return (
    <button style={styles.categoryCard} onClick={onClick}>
      <div style={styles.categoryIconWrap}>
        <Icon size={46} strokeWidth={1.9} />
      </div>
      <div style={styles.categoryLabel}>{name}</div>
    </button>
  );
}

function ItemCard({
  item,
  onEdit,
  onDelete,
}: {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (id: any) => void;
}) {
  return (
    <div style={styles.card}>
      <div
        style={{
          aspectRatio: "4 / 3",
          background: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <ImageIcon size={52} color="#94a3b8" />
        )}
      </div>

      <div style={styles.cardBody}>
        <h3 style={{ margin: "0 0 8px", fontSize: "22px", color: "#1f2937" }}>
          {item.title}
        </h3>
        <p style={{ margin: "4px 0", color: "#475569" }}>
          <strong>Year:</strong> {item.year}
        </p>
        {item.team_year && (
          <p style={{ margin: "4px 0", color: "#475569" }}>
            <strong>Team Year:</strong> {item.team_year}
          </p>
        )}
        <p style={{ margin: "4px 0", color: "#475569" }}>
          <strong>Type:</strong> {item.category}
        </p>
        <p style={{ margin: "4px 0", color: "#475569" }}>
          <strong>Size:</strong> {item.size || "—"}
        </p>
        <p style={{ margin: "4px 0", color: "#475569" }}>
          <strong>Stored:</strong> {item.location || "—"}
        </p>
        {item.notes && (
          <p style={{ margin: "4px 0", color: "#475569" }}>
            <strong>Notes:</strong> {item.notes}
          </p>
        )}
        {item.autographed && (
          <p style={{ margin: "4px 0", color: "#475569" }}>
            <strong>Autographed:</strong> Yes
          </p>
        )}

        {Array.isArray(item.players) && item.players.length > 0 && (
          <p style={{ margin: "4px 0", color: "#475569" }}>
            <strong>Players:</strong> {item.players.join(", ")}
          </p>
        )}

        {Array.isArray(item.team_players) && item.team_players.length > 0 && (
          <p style={{ margin: "4px 0", color: "#475569" }}>
            <strong>Team Roster:</strong> {item.team_players.join(", ")}
          </p>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={() => onEdit(item)}
          >
            Edit
          </button>
          <button
            type="button"
            style={{
              ...styles.secondaryButton,
              borderColor: "#8c1515",
              color: "#8c1515",
            }}
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const EMPTY_FORM: {
  year: string;
  category: string;
  title: string;
  size: string;
  location: string;
  notes: string;
  image: File | null;
  players: string[];
  team_year: string;
  team_players: string[];
  autographed: boolean;
} = {
  year: "",
  category: "",
  title: "",
  size: "",
  location: "",
  notes: "",
  image: null,
  players: [],
  team_year: "",
  team_players: [],
  autographed: false,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [items, setItems] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [playerSeasons, setPlayerSeasons] = useState<any[]>([]);

  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | number | null>(
    null
  );

  const [playerQuery, setPlayerQuery] = useState("");
  const [keywordQuery, setKeywordQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const [autographFilter, setAutographFilter] = useState("all");

  const [roomFilter, setRoomFilter] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [hasUnsavedUploadChanges, setHasUnsavedUploadChanges] = useState(false);
  const [itemPlayerQuery, setItemPlayerQuery] = useState("");

  const [hasUnsavedEditChanges, setHasUnsavedEditChanges] = useState(false);
  const [editForm, setEditForm] = useState<{
    existing_image_url: string;
    image: File | null;
    year: string;
    category: string;
    title: string;
    size: string;
    location: string;
    notes: string;
    players: string[];
    team_year: string;
    team_players: string[];
    autographed: boolean;
  }>({
    existing_image_url: "",
    image: null,
    year: "",
    category: "",
    title: "",
    size: "",
    location: "",
    notes: "",
    players: [],
    team_year: "",
    team_players: [],
    autographed: false,
  });
  const [editItemPlayerQuery, setEditItemPlayerQuery] = useState("");

  const itemPlayerSuggestions = useMemo(() => {
    if (itemPlayerQuery.trim().length < 3) return [];

    return players
      .filter((player: any) =>
        (player.full_name || "")
          .toLowerCase()
          .includes(itemPlayerQuery.toLowerCase())
      )
      .map((player: any) => player.full_name)
      .filter((name) => !form.players.includes(name))
      .slice(0, 10);
  }, [players, itemPlayerQuery, form.players]);

  const roomOptions = useMemo(() => {
    return [
      ...new Set(items.map((item) => item.location).filter(Boolean)),
    ].sort();
  }, [items]);

  const editItemPlayerSuggestions = useMemo(() => {
    if (editItemPlayerQuery.trim().length < 3) return [];

    return players
      .filter((player: any) =>
        (player.full_name || "")
          .toLowerCase()
          .includes(editItemPlayerQuery.toLowerCase())
      )
      .map((player: any) => player.full_name)
      .filter((name) => !editForm.players.includes(name))
      .slice(0, 10);
  }, [players, editItemPlayerQuery, editForm.players]);

  useEffect(() => {
    fetchItems();
    fetchPlayers();
    fetchPlayerSeasons();
  }, []);

  async function fetchItems() {
    setLoading(true);

    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("year", { ascending: false })
      .order("title", { ascending: true });

    if (error) {
      console.error(error.message);
    } else {
      setItems(data || []);
    }

    setLoading(false);
  }

  async function fetchPlayers() {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("full_name", { ascending: true });

    if (error) {
      console.error(error.message);
    } else {
      setPlayers(data || []);
    }
  }

  async function fetchPlayerSeasons() {
    const { data, error } = await supabase
      .from("player_seasons")
      .select("*")
      .order("season_year", { ascending: true });

    if (error) {
      console.error(error.message);
    } else {
      setPlayerSeasons(data || []);
    }
  }
  function clearSearchFilters() {
    setPlayerQuery("");
    setKeywordQuery("");
    setSelectedPlayer("");
    setSelectedYears([]);
    setSelectedCategory("");
    setAutographFilter("all");
    setRoomFilter("");
  }

  function goToTab(tabKey: string) {
    if (activeTab === "upload" && hasUnsavedUploadChanges) {
      const leaveUpload = window.confirm(
        "You have unsaved upload changes. Press OK to leave without saving, or Cancel to stay on Upload."
      );

      if (!leaveUpload) {
        return;
      }
    }

    if (editingItemId && hasUnsavedEditChanges) {
      const leaveEdit = window.confirm(
        "You have unsaved item edits. Press OK to leave without saving, or Cancel to stay on this tab."
      );

      if (!leaveEdit) {
        return;
      }

      setEditingItemId(null);
      setHasUnsavedEditChanges(false);
    }

    const leavingSearchToNonItems =
      activeTab === "players" && tabKey !== "players" && tabKey !== "items";

    if (leavingSearchToNonItems) {
      clearSearchFilters();
    }

    setActiveTab(tabKey);
  }
  function getRosterNamesForYear(teamYear: string) {
    if (!teamYear) return [];

    const matchingSeasonRows = playerSeasons.filter(
      (row) => String(row.season_year) === String(teamYear)
    );

    const matchedNames = matchingSeasonRows
      .map((seasonRow) => {
        const matchedPlayer = players.find(
          (player: any) =>
            player.external_player_key === seasonRow.external_player_key
        );

        return matchedPlayer?.full_name || null;
      })
      .filter(Boolean);

    return Array.from(new Set(matchedNames));
  }

  async function handleUpload() {
    if (!form.year || !form.category || !form.title) {
      alert("Please complete Year, Type of Item, and Title of Item.");
      return;
    }

    setSaving(true);
    let imageUrl = "";

    try {
      if (form.image) {
        const fileExt = form.image.name.split(".").pop();
        const safeTitle = form.title.replace(/\s+/g, "-").toLowerCase();
        const fileName = `${Date.now()}-${safeTitle}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, form.image);

        if (uploadError) {
          alert(uploadError.message);
          setSaving(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      const resolvedTeamPlayers = getRosterNamesForYear(form.team_year);

      const { error } = await supabase.from("items").insert([
        {
          year: form.year,
          category: form.category,
          title: form.title,
          size: form.size,
          location: form.location,
          notes: form.notes,
          image_url: imageUrl,
          players: form.players,
          team_year: form.team_year,
          team_players: resolvedTeamPlayers,
          autographed: form.autographed,
        },
      ]);

      if (error) {
        alert(error.message);
        setSaving(false);
        return;
      }

      setForm(EMPTY_FORM);
      setItemPlayerQuery("");
      setHasUnsavedUploadChanges(false);
      await fetchItems();
      setActiveTab("items");
    } finally {
      setSaving(false);
    }
  }

  const yearsWithItems = useMemo(
    () => new Set(items.map((item) => item.year)),
    [items]
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemYear = String(item.year || "");
      const teamYear = String(item.team_year || "");

      const matchesYear =
        selectedYears.length === 0
          ? true
          : selectedYears.includes(itemYear) ||
            selectedYears.includes(teamYear);

      const matchesCategory = selectedCategory
        ? item.category === selectedCategory
        : true;

      const matchesPlayer = selectedPlayer
        ? (Array.isArray(item.players) &&
            item.players.some(
              (player: string) =>
                player.toLowerCase() === selectedPlayer.toLowerCase()
            )) ||
          (Array.isArray(item.team_players) &&
            item.team_players.some(
              (player: string) =>
                player.toLowerCase() === selectedPlayer.toLowerCase()
            ))
        : true;

      const matchesAutograph =
        autographFilter === "all"
          ? true
          : autographFilter === "yes"
          ? !!item.autographed
          : !item.autographed;

      const matchesRoom = roomFilter ? item.location === roomFilter : true;

      const matchesKeyword =
        keywordQuery.trim().length < 3
          ? true
          : (item.title || "")
              .toLowerCase()
              .includes(keywordQuery.toLowerCase());

      return (
        matchesYear &&
        matchesCategory &&
        matchesPlayer &&
        matchesAutograph &&
        matchesRoom &&
        matchesKeyword
      );
    });
  }, [
    items,
    selectedYears,
    selectedCategory,
    selectedPlayer,
    autographFilter,
    roomFilter,
    keywordQuery,
  ]);

  const categoryYears = useMemo(() => {
    if (!selectedCategory) return [];

    return YEARS.filter((year) =>
      items.some(
        (item) => item.category === selectedCategory && item.year === year
      )
    );
  }, [items, selectedCategory]);

  const filteredAthletes = useMemo(() => {
    if (playerQuery.trim().length < 3) return [];

    return players
      .filter((player: any) =>
        (player.full_name || "")
          .toLowerCase()
          .includes(playerQuery.toLowerCase())
      )
      .map((player: any) => player.full_name)
      .slice(0, 15);
  }, [players, playerQuery]);

  const selectedPlayerSeasonRows = useMemo(() => {
    if (!selectedPlayer) return [];

    const matchingPlayer = players.find(
      (player: any) =>
        player.full_name.toLowerCase() === selectedPlayer.toLowerCase()
    );

    if (!matchingPlayer) return [];

    return playerSeasons.filter(
      (season) =>
        season.external_player_key === matchingPlayer.external_player_key
    );
  }, [players, playerSeasons, selectedPlayer]);

  function addItemPlayer(playerName: string) {
    setForm((prev) => ({
      ...prev,
      players: [...prev.players, playerName],
    }));
    setItemPlayerQuery("");
    setHasUnsavedUploadChanges(true);
  }
  const selectedPlayerRecord = useMemo<any | null>(() => {
    if (!selectedPlayer) return null;

    return (
      players.find(
        (player: any) =>
          (player.full_name || "").toLowerCase() ===
          selectedPlayer.toLowerCase()
      ) || null
    );
  }, [players, selectedPlayer]);

  const selectedPlayerPhotoUrl: string =
    selectedPlayerRecord?.photo_url ||
    selectedPlayerRecord?.photoUrl ||
    selectedPlayerRecord?.photo ||
    selectedPlayerRecord?.["photo/url"] ||
    "";

  function removeItemPlayer(playerName: string) {
    setForm((prev) => ({
      ...prev,
      players: prev.players.filter((name) => name !== playerName),
    }));
    setHasUnsavedUploadChanges(true);
  }

  function startEditItem(item: any) {
    setEditingItemId(item.id);
    setEditForm({
      existing_image_url: item.image_url || "",
      image: null,
      year: item.year || "",
      category: item.category || "",
      title: item.title || "",
      size: item.size || "",
      location: item.location || "",
      notes: item.notes || "",
      players: Array.isArray(item.players) ? item.players : [],
      team_year: item.team_year || "",
      team_players: Array.isArray(item.team_players) ? item.team_players : [],
      autographed: !!item.autographed,
    });
    setEditItemPlayerQuery("");
    setHasUnsavedEditChanges(false);
  }

  function cancelEditItem() {
    setEditingItemId(null);
    setEditItemPlayerQuery("");
    setHasUnsavedEditChanges(false);
  }

  async function handleUpdateItem() {
    if (!editingItemId) return;

    const resolvedTeamPlayers = getRosterNamesForYear(editForm.team_year);
    let imageUrl = editForm.existing_image_url || "";

    if (editForm.image) {
      const fileExt = editForm.image.name.split(".").pop();
      const safeTitle = editForm.title.replace(/\s+/g, "-").toLowerCase();
      const fileName = `${Date.now()}-${safeTitle}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, editForm.image);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("items")
      .update({
        image_url: imageUrl,
        year: editForm.year,
        category: editForm.category,
        title: editForm.title,
        size: editForm.size,
        location: editForm.location,
        notes: editForm.notes,
        players: editForm.players,
        team_year: editForm.team_year,
        team_players: resolvedTeamPlayers,
        autographed: editForm.autographed,
      })
      .eq("id", editingItemId);

    if (error) {
      alert(error.message);
      return;
    }

    setEditingItemId(null);
    setHasUnsavedEditChanges(false);
    await fetchItems();
  }

  async function handleDeleteItem(itemId: string | number) {
    const confirmed = window.confirm("Delete this archive item?");
    if (!confirmed) return;

    const { error } = await supabase.from("items").delete().eq("id", itemId);

    if (error) {
      alert(error.message);
      return;
    }

    if (editingItemId === itemId) {
      setEditingItemId(null);
    }

    await fetchItems();
  }

  function addEditItemPlayer(playerName: string) {
    setEditForm((prev) => ({
      ...prev,
      players: [...prev.players, playerName],
    }));
    setEditItemPlayerQuery("");
    setHasUnsavedEditChanges(true);
  }

  function removeEditItemPlayer(playerName: string) {
    setEditForm((prev) => ({
      ...prev,
      players: prev.players.filter((name) => name !== playerName),
    }));
    setHasUnsavedEditChanges(true);
  }

  const playerItems = useMemo(() => {
    if (!selectedPlayer) return [];

    return items.filter((item) => {
      const directPlayerMatch =
        Array.isArray(item.players) &&
        item.players.some(
          (player: string) =>
            player.toLowerCase() === selectedPlayer.toLowerCase()
        );

      const teamPlayerMatch =
        Array.isArray(item.team_players) &&
        item.team_players.some(
          (player: string) =>
            player.toLowerCase() === selectedPlayer.toLowerCase()
        );

      return directPlayerMatch || teamPlayerMatch;
    });
  }, [items, selectedPlayer]);

  const selectedPlayerItemYears = useMemo(() => {
    return Array.from(new Set(playerItems.map((item) => String(item.year))));
  }, [playerItems]);

  return (
    <div style={styles.page}>
      <StanfordBanner />
      {activeTab === "home" && (
        <>
          <SectionHeader
            title="Search by Year"
            subtitle="Select a Year to Browse"
          />
          <div style={styles.container}>
            <div style={styles.yearGrid}>
              {YEARS.map((year) => {
                const buttonStyle = yearsWithItems.has(year)
                  ? styles.yearButton
                  : { ...styles.yearButton, ...styles.yearButtonMuted };

                return (
                  <button
                    key={year}
                    style={buttonStyle}
                    onClick={() => {
                      setSelectedYears([year]);
                      setSelectedCategory("");
                      goToTab("items");
                    }}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>

          <SectionHeader
            title="Search by Type"
            subtitle="Select an Item Category"
          />
          <div style={styles.container}>
            <div style={styles.categoryGrid}>
              {categoryConfig.map(({ name, icon }) => (
                <CategoryCard
                  key={name}
                  name={name}
                  Icon={icon}
                  onClick={() => {
                    setSelectedCategory(name);
                    setSelectedYears([]);
                    goToTab("items");
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {activeTab === "upload" && (
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.cardBody}>
              <h2
                style={{
                  margin: "0 0 20px",
                  fontSize: "32px",
                  color: "#8c1515",
                }}
              >
                Upload Archive Item
              </h2>

              <div style={styles.field}>
                <label style={styles.label}>Upload Photo</label>
                <input
                  style={styles.fileInput}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      image: e.target.files ? e.target.files[0] : null,
                    });
                    setHasUnsavedUploadChanges(true);
                  }}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Year</label>
                <select
                  style={styles.select}
                  value={form.year}
                  onChange={(e) => {
                    setForm({ ...form, year: e.target.value });
                    setHasUnsavedUploadChanges(true);
                  }}
                >
                  <option value="">Select year</option>
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Type of Item</label>
                <select
                  style={styles.select}
                  value={form.category}
                  onChange={(e) => {
                    setForm({ ...form, category: e.target.value });
                    setHasUnsavedUploadChanges(true);
                  }}
                >
                  <option value="">Select type</option>
                  {categoryConfig.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Title of Item</label>
                <input
                  style={styles.input}
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value });
                    setHasUnsavedUploadChanges(true);
                  }}
                  placeholder="Enter item title"
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Players Associated with Item</label>
                <input
                  style={styles.input}
                  value={itemPlayerQuery}
                  onChange={(e) => setItemPlayerQuery(e.target.value)}
                  placeholder="Type at least 3 letters to search players"
                />

                {itemPlayerSuggestions.length > 0 && (
                  <div style={styles.suggestionsBox}>
                    {itemPlayerSuggestions.map((playerName, index) => (
                      <button
                        key={`${playerName}-${index}`}
                        type="button"
                        style={{
                          ...styles.suggestionItem,
                          borderBottom:
                            index === itemPlayerSuggestions.length - 1
                              ? "none"
                              : styles.suggestionItem.borderBottom,
                        }}
                        onClick={() => addItemPlayer(playerName)}
                      >
                        {playerName}
                      </button>
                    ))}
                  </div>
                )}

                {form.players.length > 0 && (
                  <div style={styles.chipWrap}>
                    {form.players.map((playerName) => (
                      <div key={playerName} style={styles.chip}>
                        <span>{playerName}</span>
                        <button
                          type="button"
                          style={styles.chipRemove}
                          onClick={() => removeItemPlayer(playerName)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Team Year</label>
                <select
                  style={styles.select}
                  value={form.team_year}
                  onChange={(e) => {
                    setForm({ ...form, team_year: e.target.value });
                    setHasUnsavedUploadChanges(true);
                  }}
                >
                  <option value="">Select team year if Team Award</option>
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                {form.team_year && (
                  <div
                    style={{
                      marginTop: "10px",
                      color: "#475569",
                      fontSize: "14px",
                    }}
                  >
                    This will tag the full {form.team_year} team roster
                    automatically.
                  </div>
                )}
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Autographed</label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <input
                    type="checkbox"
                    checked={form.autographed}
                    onChange={(e) => {
                      setForm({ ...form, autographed: e.target.checked });
                      setHasUnsavedUploadChanges(true);
                    }}
                  />
                  <span>Check if Yes</span>
                </label>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Size of Item</label>
                <input
                  style={styles.input}
                  value={form.size}
                  onChange={(e) => {
                    setForm({ ...form, size: e.target.value });
                    setHasUnsavedUploadChanges(true);
                  }}
                  placeholder="Example: 24 x 36 inches"
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Where is it Stored?</label>
                <select
                  style={styles.select}
                  value={form.location}
                  onChange={(e) => {
                    setForm({ ...form, location: e.target.value });
                    setHasUnsavedUploadChanges(true);
                  }}
                >
                  <option value="">Select storage location</option>
                  {STORAGE_OPTIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Notes</label>
                <input
                  style={styles.input}
                  value={form.notes}
                  onChange={(e) => {
                    setForm({ ...form, notes: e.target.value });
                    setHasUnsavedUploadChanges(true);
                  }}
                  placeholder="Enter notes"
                />
              </div>

              <button
                style={styles.primaryButton}
                onClick={handleUpload}
                disabled={saving}
              >
                {saving ? "Uploading..." : "Save Archive Item"}
              </button>
            </div>
          </div>
        </div>
      )}
      {activeTab === "items" && (
        <div style={styles.container}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "32px", color: "#8c1515" }}>
              Archive Items
            </h2>
          </div>

          <div style={{ ...styles.actionRow, marginBottom: "20px" }}>
            <button
              style={styles.secondaryButton}
              onClick={() => {
                setSelectedYears([]);
                setSelectedCategory("");
                goToTab("home");
              }}
            >
              Back to Browse
            </button>
            <button style={styles.secondaryButton} onClick={clearSearchFilters}>
              Clear Filters
            </button>
          </div>

          {selectedCategory &&
          selectedYears.length === 0 &&
          categoryYears.length > 0 ? (
            <div style={{ ...styles.card, marginBottom: "22px" }}>
              <div style={styles.cardBody}>
                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: "22px",
                    color: "#374151",
                  }}
                >
                  Browse {selectedCategory} by Year
                </h3>
                <div style={styles.yearGrid}>
                  {categoryYears.map((year) => (
                    <button
                      key={year}
                      style={styles.yearButton}
                      onClick={() => setSelectedYears([year])}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {loading ? (
            <div
              style={{ ...styles.card, padding: "32px", textAlign: "center" }}
            >
              Loading items...
            </div>
          ) : filteredItems.length === 0 ? (
            <div
              style={{ ...styles.card, padding: "32px", textAlign: "center" }}
            >
              No items found for this selection yet.
            </div>
          ) : (
            <div style={styles.itemsGrid}>
              {filteredItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ItemCard
                    item={item}
                    onEdit={startEditItem}
                    onDelete={handleDeleteItem}
                  />

                  {editingItemId === item.id && (
                    <div style={{ ...styles.card, marginTop: "0" }}>
                      <div style={styles.cardBody}>
                        <h3
                          style={{
                            margin: "0 0 18px",
                            fontSize: "24px",
                            color: "#8c1515",
                          }}
                        >
                          Edit Archive Item
                        </h3>

                        <div style={styles.field}>
                          <label style={styles.label}>Change Photo</label>
                          <input
                            style={styles.fileInput}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                image: e.target.files
                                  ? e.target.files[0]
                                  : null,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          />
                          {editForm.existing_image_url ? (
                            <div style={{ marginTop: "10px" }}>
                              <img
                                src={editForm.existing_image_url}
                                alt="Current item"
                                style={{
                                  width: "140px",
                                  height: "140px",
                                  objectFit: "cover",
                                  borderRadius: "12px",
                                  border: "1px solid #dde2e7",
                                }}
                              />
                            </div>
                          ) : null}
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Year</label>
                          <select
                            style={styles.select}
                            value={editForm.year}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                year: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          >
                            <option value="">Select year</option>
                            {YEARS.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Type of Item</label>
                          <select
                            style={styles.select}
                            value={editForm.category}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                category: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          >
                            <option value="">Select type</option>
                            {categoryConfig.map(({ name }) => (
                              <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Title</label>
                          <input
                            style={styles.input}
                            value={editForm.title}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                title: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          />
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>
                            Players Associated with Item
                          </label>
                          <input
                            style={styles.input}
                            value={editItemPlayerQuery}
                            onChange={(e) =>
                              setEditItemPlayerQuery(e.target.value)
                            }
                            placeholder="Type at least 3 letters to search players"
                          />

                          {editItemPlayerSuggestions.length > 0 && (
                            <div style={styles.suggestionsBox}>
                              {editItemPlayerSuggestions.map(
                                (playerName, index) => (
                                  <button
                                    key={`${playerName}-${index}`}
                                    type="button"
                                    style={{
                                      ...styles.suggestionItem,
                                      borderBottom:
                                        index ===
                                        editItemPlayerSuggestions.length - 1
                                          ? "none"
                                          : styles.suggestionItem.borderBottom,
                                    }}
                                    onClick={() =>
                                      addEditItemPlayer(playerName)
                                    }
                                  >
                                    {playerName}
                                  </button>
                                )
                              )}
                            </div>
                          )}

                          {editForm.players.length > 0 && (
                            <div style={styles.chipWrap}>
                              {editForm.players.map((playerName) => (
                                <div key={playerName} style={styles.chip}>
                                  <span>{playerName}</span>
                                  <button
                                    type="button"
                                    style={styles.chipRemove}
                                    onClick={() =>
                                      removeEditItemPlayer(playerName)
                                    }
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Team Year</label>
                          <select
                            style={styles.select}
                            value={editForm.team_year}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                team_year: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          >
                            <option value="">
                              Select team year if Team Award
                            </option>
                            {YEARS.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>

                          {editForm.team_year && (
                            <div
                              style={{
                                marginTop: "10px",
                                color: "#475569",
                                fontSize: "14px",
                              }}
                            >
                              This will tag the full {editForm.team_year} team
                              roster automatically.
                            </div>
                          )}
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Autographed</label>
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={editForm.autographed}
                              onChange={(e) => {
                                setEditForm({
                                  ...editForm,
                                  autographed: e.target.checked,
                                });
                                setHasUnsavedEditChanges(true);
                              }}
                            />
                            <span>Check if Yes</span>
                          </label>
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Size</label>
                          <input
                            style={styles.input}
                            value={editForm.size}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                size: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          />
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Location</label>
                          <select
                            style={styles.select}
                            value={editForm.location}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                location: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          >
                            <option value="">Select storage location</option>
                            {STORAGE_OPTIONS.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Notes</label>
                          <input
                            style={styles.input}
                            value={editForm.notes}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                notes: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          />
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            style={styles.primaryButton}
                            onClick={handleUpdateItem}
                          >
                            Save Changes
                          </button>

                          <button
                            style={styles.secondaryButton}
                            onClick={cancelEditItem}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "players" && (
        <div style={styles.container}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "32px", color: "#8c1515" }}>
              Search by...
            </h2>
            <p
              style={{
                margin: "8px 0 0",
                color: "#64748b",
                fontSize: "17px",
              }}
            >
              Choose to Search by Player, Year, Autograph Items, and by Room.
            </p>
          </div>

          <div style={{ ...styles.actionRow, marginBottom: "20px" }}>
            <button style={styles.secondaryButton} onClick={clearSearchFilters}>
              Clear Filters
            </button>
          </div>

          <div style={{ ...styles.card, marginBottom: "22px" }}>
            <div style={styles.cardBody}>
              <div style={styles.field}>
                <label style={styles.label}>Search by Player</label>
                <input
                  style={styles.input}
                  value={playerQuery}
                  onChange={(e) => {
                    setPlayerQuery(e.target.value);
                    setSelectedPlayer("");
                  }}
                  placeholder="Start typing player name..."
                />
              </div>

              {playerQuery.trim().length >= 3 &&
                filteredAthletes.length > 0 && (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {filteredAthletes.map((player: string) => (
                      <button
                        key={player}
                        style={styles.secondaryButton}
                        onClick={() => {
                          setSelectedPlayer(player);
                        }}
                      >
                        {player}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          </div>
          <div style={{ ...styles.card, marginBottom: "22px" }}>
            <div style={styles.cardBody}>
              <div style={styles.field}>
                <label style={styles.label}>Search by Keyword</label>
                <input
                  style={styles.input}
                  value={keywordQuery}
                  onChange={(e) => setKeywordQuery(e.target.value)}
                  placeholder="Type at least 3 letters from an item title..."
                />
              </div>
            </div>
          </div>
          <div style={{ ...styles.card, marginBottom: "22px" }}>
            <div style={styles.cardBody}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Search by Year (can select multiple years)
                </label>
                <div style={styles.chipWrap}>
                  {YEARS.map((year) => {
                    const selected = selectedYears.includes(year);
                    return (
                      <button
                        key={year}
                        type="button"
                        style={
                          selected ? styles.yearButton : styles.secondaryButton
                        }
                        onClick={() =>
                          setSelectedYears((prev) =>
                            prev.includes(year)
                              ? prev.filter((y) => y !== year)
                              : [...prev, year]
                          )
                        }
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...styles.card, marginBottom: "22px" }}>
            <div style={styles.cardBody}>
              <div style={styles.field}>
                <label style={styles.label}>Search by Autographed Items</label>
                <select
                  style={styles.select}
                  value={autographFilter}
                  onChange={(e) => setAutographFilter(e.target.value)}
                >
                  <option value="all">All items</option>
                  <option value="yes">Autographed only</option>
                  <option value="no">Not autographed</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ ...styles.card, marginBottom: "22px" }}>
            <div style={styles.cardBody}>
              <div style={styles.field}>
                <label style={styles.label}>Search by Room</label>
                <select
                  style={styles.select}
                  value={roomFilter}
                  onChange={(e) => setRoomFilter(e.target.value)}
                >
                  <option value="">All rooms</option>
                  {roomOptions.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "28px", color: "#8c1515" }}>
              Search Results
            </h3>
            <p
              style={{ margin: "8px 0 0", color: "#64748b", fontSize: "17px" }}
            >
              {selectedPlayer ? `Player: ${selectedPlayer}` : "All players"}
              {selectedYears.length > 0
                ? ` • Years: ${selectedYears.join(", ")}`
                : ""}
              {autographFilter === "yes" ? " • Autographed only" : ""}
              {autographFilter === "no" ? " • Not autographed" : ""}
              {roomFilter ? ` • Room: ${roomFilter}` : ""}
            </p>

            {selectedPlayer && selectedPlayerPhotoUrl ? (
              <div style={{ marginTop: "16px" }}>
                <img
                  src={selectedPlayerPhotoUrl}
                  alt={selectedPlayer}
                  style={{
                    width: "180px",
                    maxWidth: "100%",
                    borderRadius: "16px",
                    border: "1px solid #dde2e7",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    display: "block",
                  }}
                />
              </div>
            ) : null}
          </div>

          {selectedPlayer && selectedPlayerSeasonRows.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ margin: "0 0 8px", color: "#475569" }}>
                <strong>Seasons:</strong>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedPlayerSeasonRows.map((season) => {
                  const hasItems = selectedPlayerItemYears.includes(
                    String(season.season_year)
                  );

                  return hasItems ? (
                    <button
                      key={`${season.external_player_key}-${season.season_year}`}
                      type="button"
                      style={styles.secondaryButton}
                      onClick={() =>
                        setSelectedYears([String(season.season_year)])
                      }
                    >
                      {season.season_year}
                    </button>
                  ) : (
                    <span
                      key={`${season.external_player_key}-${season.season_year}`}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "10px",
                        background: "#f4f1f2",
                        border: "1px solid #dde2e7",
                        color: "#94a3b8",
                      }}
                    >
                      {season.season_year}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {loading ? (
            <div
              style={{ ...styles.card, padding: "32px", textAlign: "center" }}
            >
              Loading items...
            </div>
          ) : filteredItems.length === 0 ? (
            <div
              style={{ ...styles.card, padding: "32px", textAlign: "center" }}
            >
              No items found for this search yet.
            </div>
          ) : (
            <div style={styles.itemsGrid}>
              {filteredItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ItemCard
                    item={item}
                    onEdit={startEditItem}
                    onDelete={handleDeleteItem}
                  />

                  {editingItemId === item.id && (
                    <div style={{ ...styles.card, marginTop: "0" }}>
                      <div style={styles.cardBody}>
                        <h3
                          style={{
                            margin: "0 0 18px",
                            fontSize: "24px",
                            color: "#8c1515",
                          }}
                        >
                          Edit Archive Item
                        </h3>

                        <div style={styles.field}>
                          <label style={styles.label}>Change Photo</label>
                          <input
                            style={styles.fileInput}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                image: e.target.files
                                  ? e.target.files[0]
                                  : null,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          />
                          {editForm.existing_image_url ? (
                            <div style={{ marginTop: "10px" }}>
                              <img
                                src={editForm.existing_image_url}
                                alt="Current item"
                                style={{
                                  width: "140px",
                                  height: "140px",
                                  objectFit: "cover",
                                  borderRadius: "12px",
                                  border: "1px solid #dde2e7",
                                }}
                              />
                            </div>
                          ) : null}
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Year</label>
                          <select
                            style={styles.select}
                            value={editForm.year}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                year: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          >
                            <option value="">Select year</option>
                            {YEARS.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Type of Item</label>
                          <select
                            style={styles.select}
                            value={editForm.category}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                category: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          >
                            <option value="">Select type</option>
                            {categoryConfig.map(({ name }) => (
                              <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Title</label>
                          <input
                            style={styles.input}
                            value={editForm.title}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                title: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          />
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>
                            Players Associated with Item
                          </label>
                          <input
                            style={styles.input}
                            value={editItemPlayerQuery}
                            onChange={(e) =>
                              setEditItemPlayerQuery(e.target.value)
                            }
                            placeholder="Type at least 3 letters to search players"
                          />

                          {editItemPlayerSuggestions.length > 0 && (
                            <div style={styles.suggestionsBox}>
                              {editItemPlayerSuggestions.map(
                                (playerName, index) => (
                                  <button
                                    key={`${playerName}-${index}`}
                                    type="button"
                                    style={{
                                      ...styles.suggestionItem,
                                      borderBottom:
                                        index ===
                                        editItemPlayerSuggestions.length - 1
                                          ? "none"
                                          : styles.suggestionItem.borderBottom,
                                    }}
                                    onClick={() =>
                                      addEditItemPlayer(playerName)
                                    }
                                  >
                                    {playerName}
                                  </button>
                                )
                              )}
                            </div>
                          )}

                          {editForm.players.length > 0 && (
                            <div style={styles.chipWrap}>
                              {editForm.players.map((playerName) => (
                                <div key={playerName} style={styles.chip}>
                                  <span>{playerName}</span>
                                  <button
                                    type="button"
                                    style={styles.chipRemove}
                                    onClick={() =>
                                      removeEditItemPlayer(playerName)
                                    }
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Team Year</label>
                          <select
                            style={styles.select}
                            value={editForm.team_year}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                team_year: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          >
                            <option value="">
                              Select team year if Team Award
                            </option>
                            {YEARS.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>

                          {editForm.team_year && (
                            <div
                              style={{
                                marginTop: "10px",
                                color: "#475569",
                                fontSize: "14px",
                              }}
                            >
                              This will tag the full {editForm.team_year} team
                              roster automatically.
                            </div>
                          )}
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Autographed</label>
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={editForm.autographed}
                              onChange={(e) => {
                                setEditForm({
                                  ...editForm,
                                  autographed: e.target.checked,
                                });
                                setHasUnsavedEditChanges(true);
                              }}
                            />
                            <span>Check if Yes</span>
                          </label>
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Size</label>
                          <input
                            style={styles.input}
                            value={editForm.size}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                size: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          />
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Location</label>
                          <select
                            style={styles.select}
                            value={editForm.location}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                location: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          >
                            <option value="">Select storage location</option>
                            {STORAGE_OPTIONS.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div style={styles.field}>
                          <label style={styles.label}>Notes</label>
                          <input
                            style={styles.input}
                            value={editForm.notes}
                            onChange={(e) => {
                              setEditForm({
                                ...editForm,
                                notes: e.target.value,
                              });
                              setHasUnsavedEditChanges(true);
                            }}
                          />
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            style={styles.primaryButton}
                            onClick={handleUpdateItem}
                          >
                            Save Changes
                          </button>

                          <button
                            style={styles.secondaryButton}
                            onClick={cancelEditItem}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
      <nav style={styles.bottomNav}>
        {[
          { key: "home", label: "Home", icon: Home },
          { key: "players", label: "Search", icon: Search },
          { key: "items", label: "Items", icon: List },
          { key: "upload", label: "Upload", icon: Upload },
        ].map(({ key, label, icon: Icon }, index, arr) => {
          const buttonStyle =
            activeTab === key
              ? {
                  ...styles.navButton,
                  ...styles.navButtonActive,
                  borderRight:
                    index === arr.length - 1
                      ? "none"
                      : styles.navButton.borderRight,
                }
              : {
                  ...styles.navButton,
                  borderRight:
                    index === arr.length - 1
                      ? "none"
                      : styles.navButton.borderRight,
                };

          return (
            <button key={key} style={buttonStyle} onClick={() => goToTab(key)}>
              <Icon size={30} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
