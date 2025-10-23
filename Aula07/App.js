import React, { memo, useCallback, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  SectionList,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";

const PRODUCTS = [
  { id: "1", name: "Suco de Laranja 1L", price: 9.9, category: "Bebidas" },
  { id: "2", name: "Água Mineral 500ml", price: 3.5, category: "Bebidas" },
  { id: "3", name: "Refrigerante Cola 2L", price: 11.9, category: "Bebidas" },
  { id: "4", name: "Chá Gelado Pêssego", price: 7.5, category: "Bebidas" },

  { id: "5", name: "Arroz 5kg", price: 28.9, category: "Mercearia" },
  { id: "6", name: "Feijão Carioca 1kg", price: 9.8, category: "Mercearia" },
  { id: "7", name: "Açúcar Cristal 1kg", price: 5.4, category: "Mercearia" },
  { id: "8", name: "Macarrão Parafuso 500g", price: 6.2, category: "Mercearia" },
  { id: "9", name: "Farinha de Trigo 1kg", price: 7.1, category: "Mercearia" },

  { id: "10", name: "Sabonete Neutro", price: 2.9, category: "Higiene" },
  { id: "11", name: "Shampoo Hidratação", price: 15.9, category: "Higiene" },
  { id: "12", name: "Pasta de Dente 90g", price: 8.2, category: "Higiene" },

  { id: "13", name: "Detergente Neutro", price: 3.9, category: "Limpeza" },
  { id: "14", name: "Sabão em Pó 1kg", price: 18.9, category: "Limpeza" },
  { id: "15", name: "Amaciante 2L", price: 16.5, category: "Limpeza" },

  { id: "16", name: "Banana Nanica (kg)", price: 6.9, category: "Hortifruti" },
  { id: "17", name: "Maçã Gala (kg)", price: 9.5, category: "Hortifruti" },
  { id: "18", name: "Tomate Italiano (kg)", price: 8.7, category: "Hortifruti" },
  { id: "19", name: "Alface Crespa (un)", price: 4.2, category: "Hortifruti" },

  { id: "20", name: "Pão Francês (kg)", price: 17.9, category: "Padaria" },
  { id: "21", name: "Bolo de Cenoura", price: 24.9, category: "Padaria" },
  { id: "22", name: "Croissant", price: 6.9, category: "Padaria" },
];

function formatBRL(value) {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  }
}

const ProductItem = memo(({ product, fontScale, cardPadding }) => {
  return (
    <View style={[styles.card, { padding: cardPadding }]}>
      <Text style={[styles.productName, { fontSize: 16 * fontScale }]}>
        {product.name}
      </Text>
      <Text style={[styles.productPrice, { fontSize: 14 * fontScale }]}>
        {formatBRL(product.price)}
      </Text>
    </View>
  );
});


const SectionHeader = memo(({ title }) => {
  return <Text style={styles.sectionHeader}>{title}</Text>;
});


export default function App() {
  const [query, setQuery] = useState("");
  const { width } = useWindowDimensions();

  const fontScale = useMemo(() => {
    const scale = Math.max(0.9, Math.min(1.2, width / 375));
    return Number(scale.toFixed(2));
  }, [width]);

  const cardPadding = useMemo(() => {
    if (width < 340) return 10;
    if (width < 400) return 12;
    return 14;
  }, [width]);

  const sections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized.length
      ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(normalized))
      : PRODUCTS;

    const map = new Map();
    for (const p of filtered) {
      const current = map.get(p.category) || [];
      current.push(p);
      map.set(p.category, current);
    }

    const result = Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([title, items]) => ({
        title,
        data: items.sort((a, b) => a.name.localeCompare(b.name)),
      }));

    return result;
  }, [query]);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductItem product={item} fontScale={fontScale} cardPadding={cardPadding} />
    ),
    [fontScale, cardPadding]
  );

  const renderSectionHeader = useCallback(
    ({ section }) => <SectionHeader title={section.title} />,
    []
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo Interativo</Text>
        <Text style={styles.subtitle}>
          Filtre por nome e navegue por categorias
        </Text>
        <TextInput
          placeholder="Buscar produto..."
          placeholderTextColor="#9aa0a6"
          value={query}
          onChangeText={setQuery}
          style={[
            styles.input,
            Platform.select({
              ios: { paddingVertical: 12 },
              android: { paddingVertical: 10 },
            }),
          ]}
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
        }
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0b132b",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#0b132b",
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    paddingHorizontal: 14,
    color: "#e2e8f0",
    backgroundColor: "#111827",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 8,
  },
  sectionHeader: {
    backgroundColor: "#1f2937",
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  productName: {
    color: "#e5e7eb",
    fontWeight: "600",
    marginBottom: 6,
  },
  productPrice: {
    color: "#a3e635",
    fontWeight: "700",
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
});
