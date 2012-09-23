KateSyntax.langs.abap.syntax = {
    default: 'abap_normal',
    abap_normal: function abap_normal(m) {
        this.push();
        while(this.pos < this.len) {
            if((m = /^(?:ADD|ADJACENT|ALL|AND|APPEND|APPENDING|AS|ASCENDING|AT|BEGIN|BETWEEN|BINARY|BLOCK|BY|CASE|CENTERED|CHAIN|CHANGING|CHECK|CHECKBOX|CLEAR|COL_BACKGROUND|COL_HEADING|COL_NORMAL|COL_TOTAL|COLOR|COMMENT|COMMIT|COMPARING|COMPUTE|CONCATENATE|CONDENSE|CONSTANTS|CONTINUE|CONTROLS|COUNTRY|DATA|DECIMALS|DEFAULT|DELETE|DELETING|DESCENDING|DESCRIBE|DO|DUPLICATES|EDIT|ELSE|ELSEIF|END|ENDCASE|ENDCHAIN|ENDDO|ENDIF|ENDLOOP|ENDMODULE|ENDSELECT|ENDWHILE|ENTRIES|EQ|EXCEPTIONS|EXCLUDING|EXIT|EXIT-COMMAND|EXPORT|EXPORTING|FIELD|FIRST|FOR|FORMAT|FRAME|FREE|FROM|GE|GROUP|GT|HEADER|HEADING|HIDE|HOTSPOT|ID|IF|IMPORT|IMPORTING|IN|INDEX|INITIAL|INNER|INPUT|INSERT|INTENSIFIED|INTERVALS|INTO|IS|JOIN|KEY|LE|LEAVE|LEFT|LEFT-JUSTIFIED|LIKE|LINE|LINE-COUNT|LINES|LINES|LINE-SIZE|LIST-PROCESSING|LOOP|LT|MASK|MEMORY|MESSAGE|MESSAGE-ID|MOD|MODIFY|MODULE|MOVE|MOVE-CORRESPONDING|NE|NEW-LINE|NEW-PAGE|NO|NO-EXTENSION|NO-GAP|NO-SCROLLING|NOT|NO-ZERO|NUMBER|OBLIGATORY|OCCURS|OF|OFF|ON|OR|OTHERS|OUTPUT|PAGE|PARAMETER|PARAMETERS|PERFORM|PF-STATUS|POS_HIGH|POS_LOW|POSITION|PROGRAM|RADIOBUTTON|RANGES|READ|REFRESH|REPORT|RESERVE|RESET|RIGHT|RIGHT-JUSTIFIED|ROLLBACK|ROWS|SCREEN|SCREEN-GROUP1|SCREEN-GROUP2|SCREEN-GROUP3|SCREEN-GROUP4|SCREEN-GROUP5|SCREEN-INPUT|SCREEN-INTENSIFIED|SEARCH|SELECT|SELECTION|SELECTION-SCREEN|SELECT-OPTIONS|SEPARATED|SET|SHIFT|SINGLE|SKIP|SORT|SPACE|SPLIT|STANDARD|STARTING|STOP|STRLEN|STRUCTURE|SUBTRACT|SY-CUCOL|SY-DATUM|SY-DYNNR|SY-LINSZ|SY-LOOPC|SY-LSIND|SY-MSGID|SY-MSGTY|SY-MSGV1|SY-MSGV2|SY-MSGV3|SY-MSGV4|SY-PAGNO|SY-REPID|SY-STEPL|SY-SUBRC|SY-TABIX|SY-TCODE|SY-TMAXL|SY-UCOMM|SY-ULINE|SY-UNAME|SY-UZEIT|SY-VLINE|TABLE|TABLES|TABLEVIEW|TIMES|TITLE|TITLEBAR|TO|TRAILING|TRANSPORTING|TYPE|TYPE-POOLS|TYPES|ULINE|UP|UPDATE|USING|VALUE|WHEN|WHERE|WHILE|WITH|WORK|WRITE|AFTER|BEFORE|CALL|DURING|ENDFORM|END-OF-SELECTION|FORM|FUNCTION|INCLUDE|LINE-SELECTION|PROCESS|START-OF-SELECTION|TOP-OF-PAGE|TRANSACTION|USER-COMMAND)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) {if(m = this.abap_comment())return this.pop(), m-1;continue;}
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) {if(m = this.abap_comment())return this.pop(), m-1;continue;}
            if((m = /^[!%&()+,\-<:=>[\]\^~]/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
            this.hl(this.str[0], 'dsNormal');
        }
        this.pop();
    },
    abap_comment: function abap_comment(m) {
        this.push();
        while(this.pos < this.len) {
            if(this.str[0] == '"' && this.hl('"', 'dsComment')) return this.pop();
            if(this.str[0] == '*' && this.hl('*', 'dsComment')) return this.pop();
            if(this.str[0] == '\n') return this.pop();
            this.hl(this.str[0], 'dsComment');
        }
        this.pop();
    }
};
