import { Router } from 'express';
import fs from 'fs';
import {marked} from 'marked';

export const versionLog = Router();

versionLog.get('/version', async (req, res) => {
  res.render('version-log/index', {
    versionLogHtml: marked(fs.readFileSync('version-log.md').toString())
  });
});