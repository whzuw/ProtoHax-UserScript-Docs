import { defineModule } from "@protohax/userscript";

defineModule(
  { name: "Inventory Cleaner" },
  {
    speed: { 
      type: "number", 
      def: 25, 
      min: 5, 
      max: 100, 
      step: 5,
      label: "Блоков в секунду"
    },
    enabled: {
      type: "boolean",
      def: true,
      label: "Включено"
    }
  },
  (ctx) => {
    // Блоки для фильтрации (их ID в Bedrock)
    const FILTER_BLOCKS = {
      "cobblestone": true,
      "stone": true,           // обычный камень
      "andesite": true,
      "diorite": true,
      "dirt": true,
      "coarse_dirt": true      // грубая земля
    };

    let lastDropTime = 0;
    const getDropDelay = () => {
      // 1000ms / скорость = задержка в ms
      const baseDelay = 1000 / ctx.options.speed.value;
      // Добавляем рандом ±5ms для избежания detection
      const randomVariance = (Math.random() - 0.5) * 10;
      return Math.max(10, baseDelay + randomVariance);
    };

    const shouldDrop = (itemName: string): boolean => {
      // Нормализуем название для сравнения
      const normalizedName = itemName.toLowerCase().trim();
      return FILTER_BLOCKS[normalizedName] || false;
    };

    const cleanInventory = () => {
      if (!ctx.options.enabled.value) return;

      const now = Date.now();
      if (now - lastDropTime < getDropDelay()) return;

      const inventory = ctx.session.itemState.inventory;
      if (!inventory) return;

      // КРИТИЧНО: Итерируем в обратном порядке (39 → 0)
      // иначе при дропе индексы сдвигаются и пропускаем айтемы
      for (let i = inventory.length - 1; i >= 0; i--) {
        const slot = inventory[i];
        
        // Проверка на null/undefined
        if (!slot || !slot.item) continue;

        const itemName = slot.item.name;
        
        if (shouldDrop(itemName)) {
          try {
            // Дропим айтем по индексу
            ctx.session.itemState.dropItem(i);
            lastDropTime = now;
            
            // ВАЖНО: выходим после успешного дропа
            // чтобы не дропить несколько айтемов в одном тике
            return;
          } catch (e) {
            console.error(`Failed to drop item at slot ${i}:`, e);
          }
        }
      }
    };

    // Основной лупер - срабатывает каждый тик
    ctx.on("movement_tick", () => {
      cleanInventory();
    });
  },
);      return Math.max(10, baseDelay + randomVariance);
    };

    const shouldDrop = (itemName) => {
      // Нормализуем название для сравнения
      const normalizedName = itemName.toLowerCase().trim();
      return FILTER_BLOCKS[normalizedName] || false;
    };

    const cleanInventory = () => {
      if (!ctx.options.enabled.value) return;

      const now = Date.now();
      if (now - lastDropTime < getDropDelay()) return;

      const inventory = ctx.session.itemState.inventory;
      if (!inventory) return;

      // КРИТИЧНО: Итерируем в обратном порядке (39 → 0)
      // иначе при дропе индексы сдвигаются и пропускаем айтемы
      for (let i = inventory.length - 1; i >= 0; i--) {
        const slot = inventory[i];
        
        // Проверка на null/undefined
        if (!slot || !slot.item) continue;

        const itemName = slot.item.name;
        
        if (shouldDrop(itemName)) {
          try {
            // Дропим айтем по индексу
            ctx.session.itemState.dropItem(i);
            lastDropTime = now;
            
            // ВАЖНО: выходим после успешного дропа
            // чтобы не дропить несколько айтемов в одном тике
            return;
          } catch (e) {
            console.error(`Failed to drop item at slot ${i}:`, e);
          }
        }
      }
    };

    // Основной лупер - срабатывает каждый тик
    ctx.on("movement_tick", () => {
      cleanInventory();
    });
  },
);      return Math.max(10, baseDelay + randomVariance);
    };

    const shouldDrop = (itemName: string): boolean => {
      // Нормализуем название для сравнения
      const normalizedName = itemName.toLowerCase().trim();
      return FILTER_BLOCKS[normalizedName] || false;
    };

    const cleanInventory = () => {
      if (!ctx.options.enabled.value) return;

      const now = Date.now();
      if (now - lastDropTime < getDropDelay()) return;

      const inventory = ctx.session.itemState.inventory;
      if (!inventory) return;

      // КРИТИЧНО: Итерируем в обратном порядке (39 → 0)
      // иначе при дропе индексы сдвигаются и пропускаем айтемы
      for (let i = inventory.length - 1; i >= 0; i--) {
        const slot = inventory[i];
        
        // Проверка на null/undefined
        if (!slot || !slot.item) continue;

        const itemName = slot.item.name;
        
        if (shouldDrop(itemName)) {
          try {
            // Дропим айтем по индексу
            ctx.session.itemState.dropItem(i);
            lastDropTime = now;
            
            // ВАЖНО: выходим после успешного дропа
            // чтобы не дропить несколько айтемов в одном тике
            return;
          } catch (e) {
            console.error(`Failed to drop item at slot ${i}:`, e);
          }
        }
      }
    };

    // Основной лупер - срабатывает каждый тик
    ctx.on("movement_tick", () => {
      cleanInventory();
    });
  },
);
