import moment from "moment";
import esLocale from "moment/locale/es";

moment.locale("es", [esLocale]);

export const timeAgo = (date) => moment(date).fromNow();