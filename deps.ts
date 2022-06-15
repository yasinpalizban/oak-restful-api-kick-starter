import {Application, Context, HttpError, Middleware} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js'
import Backend from 'https://cdn.jsdelivr.net/gh/i18next/i18next-fs-backend/index.js'
import i18nextMiddleware from 'https://deno.land/x/i18next_http_middleware/index.js'
import {oakCors} from "https://deno.land/x/cors/mod.ts";
import {config} from "https://deno.land/x/dotenv/mod.ts";
import {MySQLConnector, Database} from 'https://deno.land/x/denodb/mod.ts';
import {move, moveSync} from "https://deno.land/std@0.122.0/fs/mod.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import {
    validate,
    flattenMessages,
    required,
    isNumber,
    isString,
    validateArray,
    validateObject
} from "https://deno.land/x/validasaur/mod.ts";
import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { createHash } from "https://deno.land/std@0.97.0/hash/mod.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import * as dejs from "https://deno.land/x/dejs@0.10.2/mod.ts";
import { create } from "https://deno.land/x/djwt@v2.4/mod.ts";
import { getIP } from "https://deno.land/x/get_ip/mod.ts";
import { multiParser, Form, FormFile } from 'https://deno.land/x/multiparser@v2.1.0/mod.ts'
import * as queryString from "https://deno.land/x/querystring@v1.0.2/mod.js";

//# Download the dependencies.
//    #   DENO_DIR=./deno_dir deno cache src/deps.ts

//# Make sure the variable is set for any command which invokes the cache.
//    #   DENO_DIR=./deno_dir deno test src
