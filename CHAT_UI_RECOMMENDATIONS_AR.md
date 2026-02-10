# خطة تطوير Noon Chat (تنفيذية)

> **ملاحظة:** لم أتمكن من فتح رابط المشاركة الخارجي بسبب قيود اتصال (`403`)، لذلك بنيت الخطة على الصورة المرسلة، وبشكل قابل للتنفيذ مباشرة في Flutter.

## 1) ما الذي يجب تحسينه فورًا في الشاشة الحالية

من الصورة الحالية:
- القائمة واضحة، لكن **لا يوجد تمييز بصري كافٍ** بين المقروء وغير المقروء.
- التبويبات موجودة، لكن تحتاج **حالة نشطة أوضح + عدادات**.
- زر الـ FAB موجود لكن يحتاج **إجراءات أسرع** بدل إجراء واحد فقط.
- عنصر المحادثة يفتقد تفاصيل مهمة: حالة الرسالة، mute/pin، ووقت أكثر وضوحًا.

**النتيجة المطلوبة:** المستخدم يقدر يفتح التطبيق ويعرف خلال 3 ثواني:
1. من أرسل آخر رسالة.
2. ما المحادثات غير المقروءة.
3. ما الإجراء الأسرع لبدء شات/جروب.

---

## 2) تعديل شكل عنصر المحادثة (Chat Tile)

### مواصفات UI
- السطر الأول: `اسم المحادثة` (Bold إذا unread).
- السطر الثاني: `آخر رسالة` (max lines = 1 + ellipsis).
- يمين العنصر:
  - وقت آخر رسالة بصيغة 12h.
  - Badge أخضر للرسائل غير المقروءة.
  - أيقونة صغيرة للمحادثات المثبتة أو المكتومة.

### Data Model مقترح
```dart
class ChatItem {
  final String id;
  final String title;
  final String lastMessage;
  final DateTime lastMessageAt;
  final int unreadCount;
  final bool isPinned;
  final bool isMuted;
  final MessageState lastMessageState; // sending/sent/delivered/read
}

enum MessageState { sending, sent, delivered, read }
```

### سلوك بصري
- `unreadCount > 0`:
  - اسم المحادثة: `FontWeight.w700`
  - آخر رسالة: لون أغمق.
- `isPinned == true`: إظهار icon دبوس صغير.
- `isMuted == true`: إظهار icon كتم بجانب الوقت.

---

## 3) التبويبات (All / Unread / Personal / Business)

### المطلوب
- التبويب النشط بلون أوضح + خط أثقل.
- عرض عداد لكل تبويب:
  - `Unread (3)`
  - `Business (5)`
- حركة انتقال خفيفة عند تغيير التبويب.

### منطق الفلترة
- `All`: كل المحادثات.
- `Unread`: `chat.unreadCount > 0`.
- `Personal`: `chat.type == personal`.
- `Business`: `chat.type == business`.

> يفضّل تنفيذها بــ `DefaultTabController` + state مركزي (Provider/BLoC/Riverpod).

---

## 4) تحسين الـ FAB

بدل زر واحد، استخدم **Speed Dial**:
- New chat
- New group
- Broadcast

### UX
- أول ضغطة: فتح قائمة الإجراءات.
- ضغط طويل: Tooltip بالعربية.
- حفظ آخر إجراء مستخدم لتسهيل التكرار.

---

## 5) Search فعلي وسريع

### السلوك
- البحث بالاسم + آخر رسالة.
- Debounce = 250ms.
- إذا لا نتائج: Empty state واضحة.

### منطق مقترح
```dart
List<ChatItem> searchChats(List<ChatItem> chats, String q) {
  final query = q.trim().toLowerCase();
  if (query.isEmpty) return chats;
  return chats.where((c) {
    return c.title.toLowerCase().contains(query) ||
           c.lastMessage.toLowerCase().contains(query);
  }).toList();
}
```

---

## 6) حالات الواجهة الأساسية (لازم قبل الإطلاق)

1. **Loading**: skeleton list من 6 عناصر.
2. **Empty**: رسالة + CTA "ابدأ محادثة جديدة".
3. **Error**: "تحقق من الاتصال" + زر `Retry`.
4. **Offline banner** أعلى الصفحة عند انقطاع الشبكة.

---

## 7) Actions بالسحب (Swipe)

- Swipe يمين: Pin / Unpin.
- Swipe يسار: Mute / Archive.

> في Flutter: `Dismissible` أو `Slidable` (أفضل لأنه يدعم عدة actions بدون حذف العنصر مباشرة).

---

## 8) تحسينات أداء مهمة

- Pagination للـ chat list لو البيانات كبيرة.
- Cache محلي (Hive/Isar) لعرض سريع عند فتح التطبيق.
- تحديث لحظي (stream/websocket) بدل إعادة تحميل كامل.

---

## 9) Accessiblity (مهم جدًا)

- تكبير hit area للأيقونات إلى 44px على الأقل.
- دعم Dynamic Font Scaling.
- تباين أعلى بين النص والخلفية.
- إضافة labels لعناصر الشاشة للقارئ الصوتي.

---

## 10) خطة تنفيذ أسبوعين (جاهزة للتطبيق)

### الأسبوع 1 (واجهة وسلوك)
1. Chat tile الجديد + states.
2. تبويبات بعدادات + فلترة.
3. FAB متعدد الإجراءات.
4. Search مع debounce.

### الأسبوع 2 (جودة وتجربة)
1. Empty/Loading/Error states.
2. Swipe actions.
3. Offline banner + retry logic.
4. تحسين الوصولية + polishing.

---

## Checklist استلام

- [ ] unread واضح بصريًا
- [ ] message status موجود
- [ ] tabs فيها عدادات
- [ ] search سريع ودقيق
- [ ] empty/loading/error states متوفرة
- [ ] swipe actions تعمل بلا bugs
- [ ] FAB متعدد الإجراءات
- [ ] وصولية مقبولة (contrast + touch targets)

---

## خطوة تالية مقترحة
إذا أردت، أحوّل هذه الخطة مباشرة إلى:
- هيكل ملفات Flutter (`features/chats/...`)
- Widgets جاهزة (ChatTile, ChatTabs, ChatFab)
- و state management skeleton قابل للنسخ والبدء فورًا.
