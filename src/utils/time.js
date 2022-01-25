import moment from "moment";
import esLocale from "moment/locale/es";

moment.locale("es", [esLocale]);

export const timeAgo = (date) => moment(date).fromNow();

export const hora = (date) => moment(date).format("DD/MM/YYYY HH:mm");