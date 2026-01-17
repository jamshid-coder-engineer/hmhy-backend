"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationChannel = exports.NotificationType = exports.SearchFieldEnum = exports.AuthProvider = exports.TeacherSpecification = exports.Rating = exports.LessonStatus = exports.TransactionStatus = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["SUPER_ADMIN"] = "SUPERADMIN";
    Roles["ADMIN"] = "ADMIN";
    Roles["TEACHER"] = "TEACHER";
    Roles["STUDENT"] = "STUDENT";
})(Roles || (exports.Roles = Roles = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["PAID"] = "PAID";
    TransactionStatus["PENDING_CANCELED"] = "PENDING_CANCELED";
    TransactionStatus["PAID_CANCELED"] = "PAID_CANCELED";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var LessonStatus;
(function (LessonStatus) {
    LessonStatus["AVAILABLE"] = "AVAILABLE";
    LessonStatus["BOOKED"] = "BOOKED";
    LessonStatus["COMPLETED"] = "COMPLETED";
    LessonStatus["CANCELLED"] = "CANCELED";
})(LessonStatus || (exports.LessonStatus = LessonStatus = {}));
var Rating;
(function (Rating) {
    Rating["ONE"] = "ONE";
    Rating["TWO"] = "TWO";
    Rating["THREE"] = "THREE";
    Rating["FOUR"] = "FOUR";
    Rating["FIVE"] = "FIVE";
})(Rating || (exports.Rating = Rating = {}));
var TeacherSpecification;
(function (TeacherSpecification) {
    TeacherSpecification["ENGLISH"] = "ENGLISH";
    TeacherSpecification["RUSSIAN"] = "RUSSIAN";
    TeacherSpecification["DEUTSCH"] = "DEUTSCH";
    TeacherSpecification["SPANISH"] = "SPANISH";
    TeacherSpecification["FRENCH"] = "FRENCH";
    TeacherSpecification["ITALIAN"] = "ITALIAN";
    TeacherSpecification["JAPANESE"] = "JAPANESE";
    TeacherSpecification["CHINESE"] = "CHINESE";
    TeacherSpecification["ARABIC"] = "ARABIC";
    TeacherSpecification["KOREAN"] = "KOREAN";
})(TeacherSpecification || (exports.TeacherSpecification = TeacherSpecification = {}));
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["LOCAL"] = "LOCAL";
    AuthProvider["GOOGLE"] = "GOOGLE";
})(AuthProvider || (exports.AuthProvider = AuthProvider = {}));
var SearchFieldEnum;
(function (SearchFieldEnum) {
    SearchFieldEnum["FULL_NAME"] = "fullName";
    SearchFieldEnum["EMAIL"] = "email";
    SearchFieldEnum["SPECIFICATION"] = "specification";
    SearchFieldEnum["DESCRIPTION"] = "description";
})(SearchFieldEnum || (exports.SearchFieldEnum = SearchFieldEnum = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["LESSON_REMINDER"] = "lesson_reminder";
    NotificationType["LESSON_CANCELLED"] = "lesson_cancelled";
    NotificationType["LESSON_RESCHEDULED"] = "lesson_rescheduled";
    NotificationType["PAYMENT_SUCCESS"] = "payment_success";
    NotificationType["PAYMENT_FAILED"] = "payment_failed";
    NotificationType["PAYMENT_REMINDER"] = "payment_reminder";
    NotificationType["GENERAL"] = "general";
    NotificationType["ANNOUNCEMENT"] = "announcement";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["TELEGRAM"] = "telegram";
    NotificationChannel["EMAIL"] = "email";
    NotificationChannel["SMS"] = "sms";
    NotificationChannel["IN_APP"] = "in_app";
})(NotificationChannel || (exports.NotificationChannel = NotificationChannel = {}));
//# sourceMappingURL=index.enum.js.map